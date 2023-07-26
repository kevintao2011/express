import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import activity from "../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const updateActivityProduct = async (req)=>{
    var connect;
    var newActivity
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        await activity.findOne({"_id":req.body.data.id}).then(async doc=>{  
            console.log(doc,req.body.data.productList)
            await doc.updateOne({
                packages:req.body.data.productList
            })
        })
    
        await connect.disconnect()
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default updateActivityProduct;