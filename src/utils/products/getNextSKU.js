import product from "../../models/product.js";
import society from "../../models/society.js";
import { IndexStringIncreament } from "../serverFunction/basicfunction.js";
const getNextSKU = async (req)=>{

    try {
        return await product.find(
            {code:req.body.data.code}
        ).sort(
            {created_at:-1}
        ).limit(1).then(products=>{
            console.log("found",products)
            
            var skuString = products[0].sku.split("-")
            if(products==[]){
                
            }
            skuString[2] = IndexStringIncreament(skuString[2])
            console.log("SKU",skuString.join("-"))
            return(skuString.join("-"))
        })
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    

    
}

export default getNextSKU;