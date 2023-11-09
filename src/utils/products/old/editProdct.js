import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../../connectDB.js";
import product from "../../../models/product.js";
import activity from "../../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";
import { error } from "firebase-functions/logger";

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
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(`updating product ${req.body.data._id}`)
        var p = req.body.data
        console.log(p)
        return await product.findOne({"_id":req.body.data._id}).then(async doc=>{  
            console.log("doc",doc)
            const originalDoc = doc
            
            return await doc.updateOne(p).then(d=>{
                console.log("updated doc",req.body.data)
                // check if stock need to be updated
                try{
                    if (originalDoc.product_list.length!=req.body.data.product_list.length){
                        
                    }
                }catch(err){
                    return JSON.stringify({code:"error",data:err})
                }
                
                return JSON.stringify({code:"success"})
            })
            
            
        })
        
        //await connect.disconnect()
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default updateProduct;