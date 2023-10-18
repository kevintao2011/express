import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";

const getUserOID = async (uid)=>{
    console.log("find user",uid)
    var connect;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        var User
        User = await user.findOne(
            {uid:uid},
            {
                "exp": 0,
                "last_sign_in": 0,
                "__v": 0,
                "token": 0,
            }
        )

        if (User){
            console.log("getUserOID:",User)
            
        }else{
           console.log("no such user")
        }
        //await connect.disconnect()
        console.log("handleUserLogin function exe sucess",mongoose.connection.readyState)
        return User._id
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return false

    }
    

    
}


export default getUserOID;