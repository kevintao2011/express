import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";
/*
{
  user: {
    token: ''
  },
  id: 'code'
}
*/
const getProducts = async (req)=>{
    console.log("running getSocProduct",mongoose.connection.readyState , req.body)
    var connect;


    try {
        return await product.find(
            {}
        ).then(products=>{
            if (products){
                console.log(products)
            }

            console.log("products found")
            return products
        })
        
       
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return []

    }
    

    
}

export default getProducts;