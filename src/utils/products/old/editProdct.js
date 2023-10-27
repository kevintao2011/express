import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../../connectDB.js";
import product from "../../../models/product.js";
import activity from "../../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const updateProduct = async (req)=>{
    var connect;
    var newActivity
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        await product.findOne({"_id":req.body.data._id}).then(async doc=>{  
            console.log("doc",doc)
            await doc.updateOne({
                variants:req.body.data.variants
            }).then(d=>{
                console.log("updated doc",d)
            })
        })

        //await connect.disconnect()
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default updateProduct;