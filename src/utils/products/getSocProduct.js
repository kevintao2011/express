import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";

const getSocProduct = async (req)=>{

    try {
        await product.findOne(
            {code:req.body.data.id}
        ).then(products=>{
            if (products){
                console.log(products)
            }
            // //await connect.disconnect()
            console.log("soc products function exe sucess")
            return products
        })
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    

    
}

export default getSocProduct;