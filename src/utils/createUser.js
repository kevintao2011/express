
import mongoose, { connect } from "mongoose";
import connectDB from "./connectDB.js";
import user from "../models/user.js";

const createUser = async (req)=>{
    await connectDB();
    try {
        const connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        const data = req.body;
        console.log(data);
        
        
       
        
    } catch (err) {
        console.log(err);
        console.log("failed");
        connect.disconnect();

    }
}

export default createUser;