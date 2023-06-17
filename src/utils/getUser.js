import mongoose, { connect } from "mongoose";
import connectDB from "./connectDB.js";
import user from "../models/user.js";

const getUser = async (req)=>{
    var connect;
    var jwt;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        jwt = req.body.jwt;
        console.log(jwt);

        
        const User = await user.findOne({
            token:jwt.token
        })   
        if (User){
            
            console.log(User)
        }else{
            connect.disconnect()
            return false
        }
        connect.disconnect()
       
        return User

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default getUser;