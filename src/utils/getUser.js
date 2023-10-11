import mongoose, {  connect  } from "mongoose";
import connectDB from "./connectDB.js";
import user from "../models/user.js";

const getUser = async (req)=>{
    var connect;
    var jwt;

    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        jwt = req.body.jwt;
        console.log(jwt);

        
        const User = await user.findOne(
            {token:jwt.token},
            {
                "_id": 0,
                "exp": 0,
                "last_sign_in": 0,
                "__v": 0,
                "created": 0,
                "token": 0,
            }
        )

        if (User){
            console.log(User)
        }else{
            //await connect.disconnect()
            return false
        }
        //await connect.disconnect()
        
        return User

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return false

    }
    

    
}

export default getUser;