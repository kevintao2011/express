import product from "../../models/product.js";
import { wrapResponse } from "../serverFunction/basicfunction.js";
import { getoidandsessionbycode } from "../serverFunction/getoidbycode.js";

export async function getTypeProduct(req){

    try {
        const code = req.body.data.code
        const category = req.body.data.category
        return await getoidandsessionbycode(code).then(async result=>{
            const [oid,session] = result
            return await product.findOne({ref_society:oid,product_type:category}).then(doc=>{
                return wrapResponse(true,doc)
            })
        }) 
    } catch (error) {
        console.log(error.name)
        return wrapResponse(true,error.name)
    }
    
    
    
    
}