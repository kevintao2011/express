import category from "../../models/category.js";
import product from "../../models/product.js";
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
}