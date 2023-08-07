import mongoose, {  connect, set  } from "mongoose";

import transaction from "../../models/transaction.js";
// for show product in carousell 
const updateOrderStatus = async (req)=>{
    var connect;
    console.log("updateOrderStatus",req.body)
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log("req.body.order.status",req.body.order.status)
        await transaction.updateOne(
                {_id:req.body.order._id},      
                {status:req.body.order.status}
            ).then(doc=>{  
            console.log("modified",doc)
        })
        await connect.disconnect()
        return {code:"success"}

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return {code:err}

    }
}

export default updateOrderStatus;