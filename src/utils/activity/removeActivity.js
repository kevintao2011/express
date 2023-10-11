import mongoose, {  connect, set  } from "mongoose";
import activity from "../../models/activity.js";

// for show product in carousell 
const removeActivity = async (req)=>{
    var connect;
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        await activity.deleteOne({"_id":req.body.data._id}).then(
            (resolve)=>{
                console.log("deleted!")
            },
            (rejected)=>{
                console.log("cannot delete!")
            }
        )
        //await connect.disconnect()
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default removeActivity;