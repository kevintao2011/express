import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";

const getActivity = async (req)=>{
    console.log("function getActivity")
    var connect;


    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        console.log("id",req.body.id)
        const a = await activity.findById(
            {_id:req.body.id}
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

export default getActivity;