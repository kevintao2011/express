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
const getCatOption = async (req)=>{
    console.log("running getCatOption",mongoose.connection.readyState , req.body)
    var connect;


    try {
        connect = await mongoose.connection.asPromise()
        console.log("getCatOption current connection",mongoose.connection.readyState)
        if(mongoose.connection.readyState==0){
            console.log("getCatOption connecting")
            connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        }
        else{
            console.log("getCatOption adding connection")
            
            connect = mongoose
            
            console.log("getCatOption added connection",mongoose.connection.readyState)
        }
        
    
        console.log("status before find",mongoose.connection.readyState)
        const a = await category.find(
            {}
        ).then(categories=>{
            if (categories){
                console.log(categories)
            }
            // await connect.disconnect()
            console.log("getCatOption sucess")
            return categories
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // await connect.disconnect()
        return false

    }
    

    
}

export default getCatOption;