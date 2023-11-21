import product,{ProductVariantSchema} from "../../models/product.js";
import { IntToProdIndex, findNextSKUIndex, wrapResponse } from "../serverFunction/basicfunction.js";

async function addMemberType(req){
    try {
        return await product.findOne({sku:req.body.data.sku}).then(async membershipProduct=>{
            console.log(req.body.data.doc,"searched p",membershipProduct)
            if(membershipProduct!==null){
                if(req.body.data.doc._id){ //old Object
                    console.log("replace")
                    membershipProduct.product_list.forEach((p,i)=>{
                        if(p._id.toString()===req.body.data.doc._id){
                            
                            if(membershipProduct.product_list[i].name!==req.body.data.doc.name){
                                
                                const replaceI = membershipProduct.options[0].option.findIndex(string=>string===membershipProduct.product_list[i].name)
                                membershipProduct.product_list[i].name = req.body.data.doc.name
                                console.log("replacing",replaceI,req.body.data.doc.name)
                                membershipProduct.options[0].option[replaceI]=req.body.data.doc.name
                                
                            }
                            
                            membershipProduct.product_list[i].price = req.body.data.doc.price
                            console.log("updated subprod",membershipProduct.product_list[i])
                        }
                    })
                    
                }else{ //new 
                    const SKU = (Object.keys(membershipProduct.product_list).length>0)?(
                        findNextSKUIndex(Object.keys(membershipProduct.product_list).map(p=>{return membershipProduct.product_list[p].sku}))
                    ):(
                        membershipProduct.sku+IntToProdIndex(0)
                    )
                    // console.log(req.body.data.doc)
                    // console.log(membershipProduct.product_list.create({...req.body.data.doc,sku:SKU}))
                    // membershipProduct.product_list.create({...req.body.data.doc,sku:SKU})
                    
                    membershipProduct.product_list.push({...req.body.data.doc,sku:SKU})
                    membershipProduct.options[0].option.push(req.body.data.doc.name)
                }
                return await membershipProduct.save().then(doc=>{
                    console.log("after save",doc)
                    if(doc!==null){
                        
                        return wrapResponse(true,doc)
                    }else{
                        return wrapResponse(false,"Failed to update")
                    }
                })
            }else{
                return wrapResponse(false,"No Membership is found")
            }
        })
    } catch (error) {
        console.log(error)
        return wrapResponse(false,error.name)
    }
    
}

export default  addMemberType