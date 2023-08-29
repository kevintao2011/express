import mongoose, {  connect, set  } from "mongoose";

import {transaction} from "../../models/transaction.js";
// for show product in carousell 
const uploadPaymentProof = async (req)=>{
    var connect;
    console.log("req",req.body)
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        await transaction.updateOne(
                {"_id":req.body.data._id},      
                {payment_proof:req.body.data.url}
            ).then(doc=>{  
            console.log(doc)
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

export default uploadPaymentProof;