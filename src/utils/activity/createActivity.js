import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import activity from "../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const createActivity = async (req)=>{
    var connect;
    var newActivity
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        if(body.data.single_date){
            newActivity = new activity({
                code:body.data.code,
                activity_name:body.data.activity_name,
                // single_date:body.data.single_date,
                // start_date:body.data.start_date,
                start_time:body.data.start_time,
                end_time:body.data.end_time,
                status:body.data.status,
                description_chi:body.data.description_chi,
                description_eng:body.data.description_eng,
                poster_url: string,
                published:Boolean

            })
            
        }else {
            newActivity = new activity({
                
                code:body.data.code,
                start_date:body.data.start_date,
                single_date:body.data.single_date,
                activity_name:body.data.activity_name,
                end_date:body.data.end_date,
                payment_method:body.data.payment_method,
                status:body.data.status,
                description_chi:body.data.description_chi,
                description_eng:body.data.description_eng
                //create product ticket at the same time
                
                
            })
        }
        

        await activity.create(newActivity)
        console.log("created activity")
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default createActivity;