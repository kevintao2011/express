import mongoose, {  connect, set  } from "mongoose";
import product from "../../../models/product.js";
// for show product in carousell 
const updateProductInfo = async (req)=>{
    var connect;
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(req.body.data.product_id)
        await product.findOne({"_id":req.body.data._id}).then(async doc=>{  
            await doc.updateOne({
                product_name:req.body.data.product_name,
                type:req.body.data.type,
                status:req.body.data.status,
                description_chi:req.body.data.description_chi,
                description_eng:req.body.data.description_eng,

            })
        })
        //await connect.disconnect()
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return JSON.stringify({code:err})

    }
}

export default updateProductInfo;