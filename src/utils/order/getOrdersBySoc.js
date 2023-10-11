import mongoose, {  connect  } from "mongoose";
import {transaction} from "../../models/transaction.js";

const getOrdersBySoc = async (req)=>{
    console.log("running getOrder",mongoose.connection.readyState , req.body)
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
        return await transaction.find(
            {code:req.body.code}
        ).then(transaction=>{
            if (transaction){
                console.log("transaction found")
                console.log(transaction)
                return transaction
            }
            else{
                return null
            }
            // //await connect.disconnect()
            
            
        })
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return null
    }
}

export default getOrdersBySoc;