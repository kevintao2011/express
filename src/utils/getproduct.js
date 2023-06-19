import mongoose, {  connect  } from "mongoose";
import connectDB from "./connectDB.js";
import product from "../models/product.js";
import user from "../models/user.js";

const getProduct = async (req)=>{
    var connect;
    var jwt;

    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
                
        
        const productList = await product.find({})

        console.log("productList",productList)

        productList.forEach(doc => {
            doc.activity=doc.activity._id
        })

        // if (productList){
        //     // console.log(productList)
            
        // }else{
        //     connect.disconnect()
        //     return false
        // }
        connect.disconnect()
        
        return productList

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default getProduct;