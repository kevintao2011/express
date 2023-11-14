import product from "../../models/product.js";
import society from "../../models/society.js";
import { IndexStringIncreament, IntToProdIndex } from "../serverFunction/basicfunction.js";
const getNextSKU = async (req)=>{

    try {
        return await product.find(
            {code:req.body.data.code}
        ).sort(
            {created_at:-1}
        ).limit(1).then(products=>{
            if(products.length<1){
                console.log("No Producs")
                return {success:true,data:`${req.body.data.code}-${req.body.data.session}-${IntToProdIndex(0)}`}
            }else{
                console.log("found",products)
            
                var skuString = products[0].sku.split("-")
                
                skuString[2] = IndexStringIncreament(skuString[2])
                console.log("SKU",skuString.join("-"))
                return {success:true,data:skuString.join("-")}
            }
            
        })
    } catch (err) {
        return {success:false,data:"cannot get SKU"}
        
    }
    

    
}

export default getNextSKU;