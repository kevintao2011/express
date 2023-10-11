import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import activity from "../../models/activity.js";



// for show product in carousell 
const updateActivity = async (req)=>{
    var connect;
    var newActivity
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        await activity.updateOne({"_id":req.body.data.id},req.body.data).then(async doc=>{  
            console.log(doc)
            
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

export default updateActivity;