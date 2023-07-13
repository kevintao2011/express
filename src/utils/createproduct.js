import mongoose, {  connect  } from "mongoose";
import connectDB from "./connectDB.js";
import product from "../models/product.js";
import user from "../models/user.js";
import activity from "../models/activity.js";
import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const createProduct = async (req)=>{
    var connect;
    var jwt;
    console.log(req.body)
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        const newProduct = new product({
            society:req.body.data.society,
            product_name:req.body.data.product_name[0],
            price:parseInt(req.body.data.price)[0],
            type: req.body.data.type[0],
            variants: req.body.data.variants
            
        })

        await product.create(newProduct)

        return true
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return false

    }
    

    
}

export default createProduct;