
import mongoose, { connect } from "mongoose";
import connectDB from "./connectDB.js";
import user from "../models/user.js";

const findUser = async (req)=>{
    var connect;
    var data;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        data = req.body;
        console.log(data);

        const newUser = new user({
            email:data.email,
            cohort:data.cohort,
            major:data.major,
            gender:data.gender,
            contact:data.contact,
            username:data.username,
        })
        await user.create(newUser);
        
        return 

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect();

    }
    try{

    }catch(err){
        console.log("error",err);
    }
}

export default findUser;