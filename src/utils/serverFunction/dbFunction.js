import category from "../../models/category.js"
import product from "../../models/product.js"
import society from "../../models/society.js"
import { IntToProdIndex, findNextIndexString, findNextSKUIndex } from "./basicfunction.js"
import { getoidandsessionbycode } from "./getoidbycode.js"
function dbFunction(){
    console.log("the function library is imported ")
}

async function getLatestSKU(code){
    const [oid,session] = await getoidandsessionbycode(code)
    return await product.find({session:session,ref_society:oid},{sku:1,_id:0},{sort:{sku:-1},limit:1}).then(async docs=>{
        if(docs.length>0){
            const SKUParts = docs[0].sku.split("-")
            return `${SKUParts[0]}-${SKUParts[1]}-${IntToProdIndex(parseInt(SKUParts[2])+1)}`
        }
        else{
            return await society.findOne({_id:oid}).then(doc=>{
                console.log(doc)
                return `${doc.code}-${session}-${IntToProdIndex(0)}`
            })
        }
      
    })
}


async function getCatgoryoid(catid){
    return await category.findOne({id:catid}).then(doc=>{
        console.log("getcatid",doc._id)
        return doc._id
    })
}

export default dbFunction
export {
    getLatestSKU,
    getCatgoryoid
    
}
