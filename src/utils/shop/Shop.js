import e from "express";
import Cart from "../../models/cart.js";
import category from "../../models/category.js";
import product, { product_variants } from "../../models/product.js";
import user from "../../models/user.js";
import getUserMembership from "../membership/getUserMembership.js";
import { wrapResponse } from "../serverFunction/basicfunction.js";
import getUserOID from "../serverFunction/getuseroid.js";

export default class Shop{
    async getCategory(){
        return await category.find({published:true},{id:1,_id:0,category_name:1}).then(cats=>{
            return wrapResponse(true,cats.map(cat=>{
                console.log(cat.category_name,cat.id)
                return{[cat.category_name]:cat.id}
            }))
        })
    }
    async getProducts(page,ipp){
        // need get products in other major that not major only and get all product in belonging major
        console.log(page,ipp)
        return await product.find({published:true})
        .limit(ipp)
        .skip(ipp*page)
        .then(async products=>{
            return wrapResponse(true,{products:products,maxPage:Math.floor(await product.count({published:true})/ipp)})
        })
    }
    

    async getProduct(sku){
        console.log("sku",sku)
        return await product.findOne(
            {sku:sku}
        )
        .populate({ path: 'product_list',model:product_variants})
        .then(prod=>{
            if (prod!==null){
                return wrapResponse(true,prod)
            }else{
                return wrapResponse(false,"The Product dont exists")
            }
        })
    }

    async getCart(useruid){
        return await getUserOID(useruid).then(async oid=>{
            if(oid!==null){//,{},{populate:"products"}
            return await Cart.findOne({user:oid},{})
            .populate(
                {
                    path: 'products.prod_id',
                    model: 'product_variants',
                    populate: {
                        path: 'ref_product',
                        model: 'products'
                    }
                }
            ).then(async result=>{//,{populate:["products.prod_id"],new:true}
                    console.log("get cart",result)
                    if(result!==null){
                        return wrapResponse(true,result.products)
                    }else{
                        return await Cart.create({user:oid}).then(async doc=>{
                            return wrapResponse(true,doc.products)
                        })
                    }
                })
            }else{
                return (wrapResponse(false,"no such user"))
            }
            
        })
    }

    /**
     * 
     * @param {*} useruid req.body.tokeninfo.uid using middleware checkAuth
     * @param {*} sku get from user sku of model instead of product
     * @param {*} quantity +n for add, -n for decrease
     */
    async addToCart(useruid,sku,quantity){
        // pass in sku of selected option and quantity
        console.log(useruid,sku,quantity)
        
        try
        {
            return await getUserOID(useruid).then(async oid=>{
                return await product_variants.findOne(
                    {"sku":sku} //1. Find the product doc
                ).then(async prod=>{
                    console.log("product able to add cart")
                    if (prod!==null){ //2.1 if found the product 
                        return await Cart.findOneAndUpdate(//3 update user cart
                            // find user's cart and correct product_id, increase 
                            {user:oid},
                            { 
                            },
                            {
                                new: true,
                                upsert: true // Make this update into an upsert
                            }
                        ).then(async cart=>{
                                console.log("updated cart :",cart)
                                console.log("add prod :",prod)
                                //if product in cart, increase quantity and return
                                for (let cart_prod of cart.products){
                                    console.log(prod._id,cart_prod.prod_id)
                                    if(prod._id.toString()==cart_prod.prod_id.toString()){
                                        console.log("found same prod in cart",cart_prod.quantity,quantity)
                                        cart_prod.quantity += parseInt(quantity);
                                        return await cart.save().then(async doc => {
                                            console.log("return 1")
                                            return wrapResponse(true, "increased in cart");
                                        });
                                        
                                    }
                                }
                                //otherwise, add new product to cart products list
                                cart.products.push({prod_id:prod._id,quantity:quantity})
                                return await cart.save().then(async doc=>{
                                    console.log("return 2")
                                    return wrapResponse(true,"added to cart")
                                })
                                
                            },
                            err=>{ 
                                console.log("return 3")
                                return wrapResponse(false,"failed")
                            }
                        )
                        
                        
                    }else{
                        console.log("return 4")
                        return wrapResponse(false,"failed to add cart")
                    }
                })
            })
        }catch(err){
            console.log(err)
            return wrapResponse(false,err.name)
        }
        
    }
}

