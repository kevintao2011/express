import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../../connectDB.js";
import product from "../../../models/product.js";
import activity from "../../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";
import { error } from "firebase-functions/logger";
import stock from "../../../models/stock.js";
import { IntToFixDisgitString, IntToProdIndex, findNextIndex, findNextSKUIndex } from "../../serverFunction/basicfunction.js";
import getUserOID from "../../serverFunction/getuseroid.js";

// for show product in carousell 
const updateProduct = async (req)=>{
    var connect;
    var newActivity
    const body = req.body;
    /*  
        Missing update Modification record 
        GG
        GG
        GG
    */
    return await getUserOID(req.body.tokeninfo.user_id).then(async userOid=>{
        try {
            //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
            console.log(`updating product ${req.body.data._id}`)
            var p = req.body.data
            console.log(p)
            return await product.findOne({"_id":req.body.data._id}).then(async doc=>{  
                console.log("doc to be edit",doc)
                const originalProducListLength = doc.product_list.length
                
                // return await doc.updateOne(p).then(d=>{
                //     console.log("updated doc",req.body.data)
                //     // check if stock need to be updated
                //     // how to handle if later ppl scan and entry new product stock
                    
                    
                //     return JSON.stringify({code:"success"})
                // })
                
                /*
                    Situation 1: new subproduct -> also no stocks
                    situation 2: old subproduct with old stock
                        situation 2a : no change for quantity
                        situation 2a : add prod
                        situation 2a : add prod
    
    
    
                */
                await Promise.all(
                    Object.keys(doc.toObject()).map(async key=>{
                        console.log(`working on key ${key}`)
                        if(key!="product_list"){
                            try{
                                doc[key]=req.body.data[key]
                            }catch{
                                console.log(`No key ${key}`)
                            }
                        }
                        else{ //handle product_list modification
                            
                            for (const [i,subProduct] of doc.product_list.entries()) { // handle existed subprod
                                console.log(`"checking orignal " ${subProduct} and  ${req.body.data.product_list[i]}`)
                                const match = new RegExp(`${subProduct.sku}`,"gm") 
                                if(subProduct.quantity === req.body.data.product_list[i].quantity){ //nth
                                    console.log("no stocks to edit",subProduct.quantity,"vs",req.body.data.product_list[i].quantity)
                                }else if(subProduct.quantity>req.body.data.product_list[i].quantity){ //delet 
                                    console.log("delete some stock")
                                    try {
                                        const deletAmount = subProduct.quantity-req.body.data.product_list[i].quantity
                                        await stock.find(
                                                {$and:[{sku:match},{$and:[{status:"for-sale"}]}]}
                                                ,{_id:1}
                                                ,{sort:{created_at:-1},limit:deletAmount}
                                            ).then(async (result)=>{
                                                console.log("stocks that can be deleted:", result)
                                                const ids =  result.map(doc=>{
                                                return doc._id 
                                            })
                                            await stock.deleteMany({_id:{$in:ids}}).then(async dresult=>{
                                                console.log("delete result: ",dresult.deletedCount)
                                                await stock.count({sku:match}).then((n)=>{
                                                    doc.product_list[i].quantity=n
                                                })
                                            })
                                            
                                        })
                                    } catch (error) {
                                        console.log(error)
                                    }
                                    
                                }else if(subProduct.quantity<req.body.data.product_list[i].quantity){ //add
                                    console.log("add some stock")
                                    try {
                                        const increaseAmount = req.body.data.product_list[i].quantity-subProduct.quantity
                                        await stock.findOne({sku:match},{},{sort:{sku:-1}}).then(async result=>{
                                            var startIndex = 0
                                            console.log("found stock",result)
                                            if(result===null){
                                                startIndex =  0
                                            }else{
                                                startIndex = findNextSKUIndex([result.sku])
                                            }
                                            var newStocks = []
                                            for (let index = startIndex; index < startIndex+increaseAmount; index++) {
                                                var newStock = new stock()
                                                newStock.ref_society = req.body.data.ref_society
                                                newStock.ref_product = subProduct._id
                                                newStock.created_by = userOid
                                                newStock.sku = `${subProduct.sku}-${IntToProdIndex(index)}`
                                                newStock.status = "for-sale"
                                                newStock.create_method = "edit"
                                                newStocks.push(newStock)
                                            }
                                            await stock.insertMany(newStocks).then(async iresult=>{
                                                console.log("added: ",iresult.length)
                                                await stock.count({sku:match}).then((n)=>{
                                                    doc.product_list[i].quantity=n
                                                })
                                                
                                            })
                                        })
                                    } catch (error) {
                                        console.log(error)
                                    }
                                    
                                }else{
                                    console.log("not match any")
                                }
                                
                            }
                            
                            
                            
                            
                            if(req.body.data.product_list.length>doc["product_list"].length){
                                doc.product_list.push(...req.body.data.product_list.slice(doc["product_list"].length,req.body.data.product_list.length))
                                console.log("adding new subpords")
                                const stocksTobeCreated = doc.product_list.slice(originalProducListLength,req.body.data.product_list.length).map((subproduct,i)=>{
                                    var stocks = [] 
                                    for (let index = 0; index < subproduct.quantity; index++) {
                                        const d = new stock(subproduct)
                                        console.log("inserting new docs",d.sku)
                                        d.sku=d.sku+"-"+IntToProdIndex(index)
                                        d.ref_product=subproduct._id
                                        d.ref_society=doc._id
                                        d.status = "for-sale"
                                        d.created_by = userOid
                                        d.create_method = "edit"
                                        stocks.push(d)
                                    }
                                    return stocks
                                    
                                })
                                await stock.insertMany(stocksTobeCreated.flat()).then(()=>{
                                    //console.log("created ",i," subprod")
                                    
                                    return true
                                })
                            }else{
                                return true
                            }














                            // forEach(async (docs,i)=>{
                            //     console.log("creating ",i," subprod")
                            //     await stock.insertMany(docs).then(()=>{
                            //         console.log("created ",i," subprod")
                            //         doc["product_list"].push(...req.body.data.product_list.slice(doc["product_list"].length,req.body.data.product_list.length-1))
                            //     })
                                
                            // })
                            

                            // if(req.body.data.product_list.length>doc["product_list"].length){ // add new subprod
                            //     const NewStocks=[]
                            //     for (let index = doc["product_list"].length; index < req.body.data.product_list.length; index++) {
                            //         console.log(req.body.data.product_list[index])
                            //         const newSubProd=req.body.data.product_list[index]
                            //         newSubProd
                            //         NewStocks.push(new stock())
                            //     }
                            //     await stock.insertMany(NewStocks)
                            //     return true
                            // }else{
                            //     return true
                            // }
                            
                            // doc["product_list"].forEach(async (subProduct,i)=>{
                            //     console.log(`"checking orignal " ${subProduct} and  ${req.body.data.product_list[i]}`)
                            //     const match = new RegExp(`${subProduct.sku}`,"gm") 
                            //     if(subProduct.quantity === req.body.data.product_list[i].quantity){ //nth
                            //         console.log("no stocks to edit")
                            //     }else if(subProduct.quantity>req.body.data.product_list[i].quantity){ //delet 
                            //         console.log("delete some stock")
                            //         try {
                            //             const deletAmount = subProduct.quantity-req.body.data.product_list[i].quantity
                            //             await stock.find(
                            //                     {$and:[{sku:match},{$and:[{status:"for-sale"}]}]}
                            //                     ,{_id:1}
                            //                     ,{sort:{created_at:-1},limit:deletAmount}
                            //                 ).then(async (result)=>{
                            //                     console.log("stocks that can be deleted:", result)
                            //                     const ids =  result.map(doc=>{
                            //                     return doc._id 
                            //                 })
                            //                 await stock.deleteMany({_id:{$in:ids}}).then(dresult=>{
                            //                     console.log("delete result: ",dresult.deletedCount)
                            //                     doc.product_list[i].quantity-=dresult.deletedCount
                            //                 })
                                            
                            //             })
                            //         } catch (error) {
                            //             console.log(error)
                            //         }
                                    
                            //     }else if(subProduct.quantity<req.body.data.product_list[i].quantity){ //add
                            //         console.log("add some stock")
                            //         try {
                            //             const increaseAmount = req.body.data.product_list[i].quantity-subProduct.quantity
                            //             await stock.findOne({sku:match},{sku:1}).then(async result=>{
                            //                 var startIndex = 0
                            //                 if(result===undefined){
                            //                     startIndex =  0
                            //                 }else{
                            //                     startIndex = findNextIndex([result.sku])
                            //                 }
                            //                 var newStocks = []
                            //                 for (let index = startIndex; index < startIndex+increaseAmount; index++) {
                            //                     var newStock = new stock()
                            //                     newStock.ref_society = req.body.data.ref_society
                            //                     newStock.created_by = userOid
                            //                     newStock.sku = IntToProdIndex(index)
                            //                     newStocks.push(newStock)
                            //                 }
                            //                 await stock.insertMany(newStocks).then(iresult=>{
                            //                     console.log("added: ",iresult.length)
                            //                     doc.product_list[i].quantity+=iresult.length
                            //                 })
                            //             })
                            //         } catch (error) {
                            //             console.log(error)
                            //         }
                                    
                            //     }else{
                            //         console.log("not match any")
                            //     }
        
                                
                            // }) 
                        }
                        
                    })
                )
                
                console.log("doc before edit save",doc)
                return await doc.save().then((r)=>{
                    if(r){
                        return  JSON.stringify({code:"success"})
                    
                    }else{
                        return  JSON.stringify({code:"error"})
                    }
                })
            })
            
            //await connect.disconnect()
            
    
        } catch (err) {
            console.log("error",err);
            console.log("failed");
            //await connect.disconnect()
            return JSON.stringify({code:err})
    
        }
    })
    
    

    
}

export default updateProduct;