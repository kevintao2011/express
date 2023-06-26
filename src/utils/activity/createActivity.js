import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import activity from "../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const createProduct = async (req)=>{
    var connect;
    var jwt;
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        const newActivity = new activity({
            society:body.data.society,
            start_date:body.data.start_date,
            end_date:body.data.end_date,
            activity_name:body.data.activity_name,
            payment_method:body.data.payment_method,
            maximum_participant:body.data.maximum_participant,
            
            //create product ticket at the same time
            
            

            product_name:body.data.product_name,
            price:parseInt(body.data.price),
            type: body.data.type,
            total:parseInt(body.data.total),
            link:body.data.link,
            delivery:body.data.delivery,
            payment_method:body.data.payment_method
        })

        await activity.create(newActivity)

        return true
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default createProduct;