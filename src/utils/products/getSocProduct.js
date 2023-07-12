import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";
const getSocProduct = async (req)=>{
    console.log("running getSocProduct")
    var connect;


    try {
        // connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
    
        
        const a = await product.find(
            {code:req.body.id}
        ).then(products=>{
            if (products){
                console.log(products)
            }
            // connect.disconnect()
            console.log("products function exe sucess")
            return products
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // connect.disconnect()
        return false

    }
    

    
}

export default getSocProduct;