import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";

const getSocActivity = async (req)=>{
    console.log("running getSocActivity",mongoose.connection.readyState , req.body)
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
        
        const a = await activity.find(
            {code:req.body.id}
        ).then(async activities=>{
            if (activities){
                console.log(activities)
            }
            await connect.disconnect()
            console.log("function exe sucess")
            return activities
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return false

    }
    

    
}

export default getSocActivity;