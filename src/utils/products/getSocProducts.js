import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";
import getoidbycode from "../serverFunction/getoidbycode.js";
/*
{
  user: {
    token: ''
  },
  id: 'code'
}
*/
const getSocProducts = async (req)=>{
    console.log("running getSocProduct",mongoose.connection.readyState , req.body)
    var connect;


    try {
        connect = await mongoose.connection.asPromise()
        console.log("getSocProduct current connection",mongoose.connection.readyState)
        if(mongoose.connection.readyState==0){
            console.log("getSocProduct connecting")
            //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        }
        else{
            console.log("getSocProduct adding connection")
            
            connect = mongoose
            
            console.log("getSocProduct added connection",mongoose.connection.readyState)
        }
        
    
        console.log("status before find",mongoose.connection.readyState)
        return await getoidbycode(req.body.id).then(async oid=>{
           return  await product.find(
                {ref_society:oid}
            ).then(products=>{
                if (products){
                    console.log(products)
                }
                // //await connect.disconnect()
                console.log("soc products function exe sucess")
                return products
            })
        })
        // const a = await product.find(
        //     {code:req.body.id}
        // ).then(products=>{
        //     if (products){
        //         console.log(products)
        //     }
        //     // //await connect.disconnect()
        //     console.log("soc products function exe sucess")
        //     return products
        // })

        // return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    

    
}

export default getSocProducts;