import product,{ProductVariantSchema} from "../../models/product";
import { IntToProdIndex, findNextSKUIndex, wrapResponse } from "../serverFunction/basicfunction";

async function addMemberType(req){
    await product.findOne({code:code}).then(membershipProduct=>{
        if(membershipProduct!==null){
            const SKU = (Object.keys(membershipProduct.product_list).length>0)?(
                findNextSKUIndex(Object.keys(membershipProduct.product_list).map(p=>{return membershipProduct.product_list[p].sku}))
            ):(
                membershipProduct.sku+IntToProdIndex(0)
            )
            
            membershipProduct.product_list.create({...req.body.data,sku:SKU,totalS})
        }else{
            return wrapResponse(false,"No Membership is found")
        }
    })
}

export default  addMemberType