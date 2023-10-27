import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../../connectDB.js";
import product from "../../../models/product.js";
import activity from "../../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const changeProductMainIcon = async (req)=>{
    var connect;
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(req.body.data.product_id)
        await product.updateOne({"_id":req.body.data.product_id},{"product_icon":req.body.data.product_icon}).then(async doc=>{  
           console.log("updated",doc)
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

export default changeProductMainIcon;