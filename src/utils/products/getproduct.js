import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const getProduct = async (req)=>{
    var connect;
    var jwt;

    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
                
        
        const productList = await product.find({},{"_id":0 , "activity_id":0})
        
        


        // // when activity is objectID
        // async function update (connect,productList) {
        //     var newproductList = []
        //     for (const doc of productList) {
        //         console.log("productList",doc)
        //         const act =  await activity.findById(doc.get("activity").toString(),{"activity_name":1})
        //         doc.set("activity", act.get("activity_name"))
        //         console.log("act",doc)
        //         newproductList.push(doc)
        //     }
        //     connect.disconnect()
        //     return newproductList
        // }

        // return await update(connect,productList)
        
        return productList
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default getProduct;