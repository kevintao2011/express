import product from "../../models/product";
import { getoidandsessionbycode } from "../serverFunction/getoidbycode";

export async function getTypeProduct(req){
    const code = req.body.data.code
    const category = req.body.data.category
    
    await getoidandsessionbycode(code).then(async result=>{
        const [oid,session] = result
        return await product.find({ref_society:oid,})
    })
    
    
}