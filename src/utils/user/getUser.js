import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";

const getUser = async (UID)=>{
    console.log("function getUser",UID)
    var connect;


    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        
        const User = await user.findOne(
            {uid:UID},
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
            user.create()
            await connect.disconnect()
            console.log("no record")
            return false
        }
        await connect.disconnect()
        console.log("function exe sucess")
        return User
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return false

    }
    

    
}

export default getUser;