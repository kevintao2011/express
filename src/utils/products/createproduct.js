import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import user from "../../models/user.js";
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

        const newProduct = new product({
            "code":body.data.code, //soc-code
            "product_name":body.data.product_name,
            // "type": body.data.type,
            "status":body.data.status, //selling//ended
            "img_url":body.data.img_url,
            "link":body.data.link,
            "variants":body.data.variants,
            "type":body.data.type
            
        })

        await product.create(newProduct)

        return true
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default createProduct;