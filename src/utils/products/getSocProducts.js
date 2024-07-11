import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import product from "../../models/product.js";
import getoidbycode, { getoidandsessionbycode } from "../serverFunction/getoidbycode.js";
import { wrapResponse } from "../serverFunction/basicfunction.js";
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
                    // console.log(products)
                    products.forEach((p,i)=>{
                        console.log(i,p.product_name_chi)
                    })
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

const getSessionSocProducts = async (req)=>{
    console.log("running getSocProduct",req.body)
    try {
        console.log("status before find",mongoose.connection.readyState)
        return await getoidandsessionbycode(req.body.data.code).then(async result=>{
            const [oid,currentSessoion]=result
            return  await product.find(
                {ref_society:oid,sku:currentSessoion}
            ).sort({sku:1}).then(products=>{
                if (products){
                    console.log(products)
                    return wrapResponse(true,products)
                }else{
                    return wrapResponse(false,"Empty Products")
                }
                
            })
        })
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return wrapResponse(false,"Cannot get Products")
    }
    

    
}

export default getSocProducts;
export{getSessionSocProducts}