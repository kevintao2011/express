import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";

const handleUserLogin = async (req)=>{
    console.log("handleUserLogin",req.body.tokeninfo.uid)
    // var connect;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        var User
        User = await user.findOne(
            {uid:req.body.tokeninfo.uid},
            {
                
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
            await user.create({
                email:req.body.tokeninfo.email,
                uid:req.body.tokeninfo.uid,
                created:Date.now(),
                first_login:true
            }).then((doc)=>{
                console.log("doc",doc)
                User = doc
                console.log("created User")
            })
            
            
            return User
        }
        //await connect.disconnect()
        // console.log("handleUserLogin function exe sucess",mongoose.connection.readyState)
        return User
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return false

    }
    

    
}

export default handleUserLogin;