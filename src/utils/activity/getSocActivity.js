import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";

const getSocActivity = async (req)=>{
    
    var connect;


    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        
        const a = await activity.find(
            {code:req.body.id}
        ).then(activities=>{
            if (activities){
                console.log(activities)
            }
            connect.disconnect()
            console.log("function exe sucess")
            return activities
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default getSocActivity;