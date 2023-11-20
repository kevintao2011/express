import category from "../../models/category.js"
import product from "../../models/product.js"
import { findNextIndexString } from "./basicfunction.js"
import { getoidandsessionbycode } from "./getoidbycode.js"
function dbFunction(){
    console.log("the function library is imported ")
}

async function getLatestSKU(code){
    const [oid,session] = await getoidandsessionbycode(code)
    return findNextIndexString(await product.find({session:session,ref_society:oid},{sku:1,_id:0}).then(docs=>{
      return docs.map(doc=>{
        return doc.sku
      })
    }))
}


async function getCatgoryoid(catid){
    await category.findOne({id:catid}).then(doc=>{
        return doc._id
    })
}

export default dbFunction
export {
    getLatestSKU,
    getCatgoryoid
    
}
