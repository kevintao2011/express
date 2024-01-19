import Cart from "../../models/cart.js";
import category from "../../models/category.js";
import product from "../../models/product.js";
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
        ).then(prod=>{
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
            return await Cart.findOne({user:oid},{},{populate:["products.prod_id","products.model_id"],new:true}).then(async result=>{
                    if(result!==null){
                        return wrapResponse(true,result.products)
                    }else{
                        return await Cart.create({user:oid}).then(doc=>{
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
        console.log(useruid,sku,quantity)
        
        return await getUserOID(useruid).then(async oid=>{
            return await product.findOne(
                {"product_list.sku":sku}
            ).then(async prod=>{
                console.log(prod)
                if (prod!==null){
                    console.log("found product")
                    return await Cart.findOneAndUpdate(
                        {user:oid,'products.prod_id':prod._id},
                        {$inc:{'products.$[elem].quantity':quantity}},
                        {arrayFilters: [{ "elem.prod_id": prod._id }],new:true}
                    ).then(async doc=>{
                        let model_id
                        model_id = prod.product_list.filter(subprods=>subprods.sku==sku)[0]._id
                        console.log("model_id",model_id)
                        if(doc){//output 1: increased for existed prod in cart
                                console.log(doc)
                                return wrapResponse(true,{type:'inc',prod_id:prod.sku})
                        }else{
                            return await Cart.findOneAndUpdate(
                                {user:oid},{$push:{products:{prod_id:prod._id,quantity:quantity,model_id:model_id}}},{new:true}
                            ).then(doc=>{//output 2:push new prod to cart
                                console.log("no same items in cart",doc,model_id)
                                return wrapResponse(true,{type:'inc',sku:prod.sku,prod_info:prod.toObject()})
                            },()=>{//output 3:failed
                                console.log("couldnt add")
                                return wrapResponse(false,"couldnt add")
                            })
                        } 
                    })
                    // await Cart.findOneAndUpdate(
                    //     {user:oid,"products.prod_id":prod._id},
                    //     {$inc:{"products.$.quantity":1}}
                    // ).then(doc=>{
                    //     if(doc){
                    //         return wrapResponse(true,doc.toObject())
                    //     }else{
                            
                    //         return wrapResponse(false,"no such doc")
                    //     }
                    // })
                    //await Cart.create({user:oid,products:{id:{}}})
                }else{
                    return wrapResponse(false,"failed to add cart")
                }
            })
        })
        
    }
}