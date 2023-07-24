import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import activity from "../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const uploadProductIcon = async (req)=>{
    var connect;
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        await product.findOne({"_id":req.body.data.id}).then(async doc=>{  
            console.log(doc,req.body.data.posterURL)
            await doc.updateOne({
                posterURL:req.body.data.posterURL
            })
        })
    
        // if(body.data.single_date){
        //     newActivity = new activity({
        //         code:body.data.code,
        //         activity_name:body.data.activity_name,
        //         single_date:body.data.single_date,
        //         start_date:body.data.start_date,
        //         start_time:body.data.start_time,
        //         end_time:body.data.end_time,
        //         payment_method:body.data.payment_method,
        //         status:body.data.status

        //     })
            
        // }else {
        //     newActivity = new activity({
                
        //         code:body.data.code,
        //         start_date:body.data.start_date,
        //         single_date:body.data.single_date,
        //         activity_name:body.data.activity_name,
        //         end_date:body.data.end_date,
        //         payment_method:body.data.payment_method,
        //         status:body.data.status,
        //         //create product ticket at the same time
                
                
        //     })
        // }
        

        // await activity.create(newActivity)
        // console.log("created activity")
        await connect.disconnect()
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default uploadProductIcon;