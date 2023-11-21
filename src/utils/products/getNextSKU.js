import product from "../../models/product.js";
import society from "../../models/society.js";
import { IndexStringIncreament, IntToProdIndex } from "../serverFunction/basicfunction.js";
import { getLatestSKU } from "../serverFunction/dbFunction.js";
const getNextSKU = async (req)=>{

    try {
        return await getLatestSKU(req.body.data.code).then(sku=>{
            return {success:true,data:sku}
            
        })
    } catch (err) {
        console.log(err.name)
        return {success:false,data:"cannot get SKU"}
        
    }
    

    
}

export default getNextSKU;