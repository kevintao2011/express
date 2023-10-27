import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";
import category from "../../models/category.js";
/*
{
  user: {
    token: ''
  },
  id: 'code'
}
*/
const getCatShownOption = async (req)=>{
    console.log("running getCatOption",mongoose.connection.readyState , req.body)
    var connect;


    try {
        
        const a = await category.find(
            {hidden:false}
        ).then(categories=>{
            if (categories){
                console.log(categories)
            }
            // //await connect.disconnect()
            console.log("getCatOption sucess")
            return categories
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    

    
}

export default getCatShownOption;