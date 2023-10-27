import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";

const editSocProduct = async (req)=>{
    console.log("running editSocProduct",mongoose.connection.readyState , req.body)
    try{
        return await product.findOne(
            {_id:req.body.data.id}
        ).then(product=>{
            if (product){
                console.log(product)
            }else{
                console.log("cannot find product")
            }
            // //await connect.disconnect()
            console.log("editSocProduct function exe sucess")
            return product
            

        }) 
    }catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    
    

    
}

export default editSocProduct;