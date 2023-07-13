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
const getSocProduct = async (req)=>{
    console.log("running getSocProduct",mongoose.connection.readyState , req.body)
    var connect;


    try {
        connect = await mongoose.connection.asPromise()
        console.log("getSocActivity current connection",mongoose.connection.readyState)
        if(mongoose.connection.readyState==0){
            console.log("getSocActivity connecting")
            connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        }
        else{
            console.log("getSocActivity adding connection")
            
            connect = mongoose
            
            console.log("getSocActivity added connection",mongoose.connection.readyState)
        }
        
    
        console.log("status before find",mongoose.connection.readyState)
        const a = await product.find(
            {code:req.body.data.major}
        ).then(products=>{
            if (products){
                console.log(products)
            }
            // await connect.disconnect()
            console.log("products function exe sucess")
            return products
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // await connect.disconnect()
        return false

    }
    

    
}

export default getSocProduct;