import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";

const getSocActivity = async (req)=>{
    
    var connect;


    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        
        const activities = await activity.find(
            {code:req.body.id},
            {
                "_id": 0,
                
            }
        )

        if (activities){
            console.log(activities)
        }else{
            user.create()
            connect.disconnect()
            console.log("no record")
            return false
        }
        connect.disconnect()
        console.log("function exe sucess")
        return activities
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default getSocActivity;