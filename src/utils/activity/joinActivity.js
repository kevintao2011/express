import mongoose, { connect } from "mongoose";
import user from "../../models/user.js";


const editUser = async (req)=>{
    var connect;
    var jwt;
    var data;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        jwt = req.body.jwt;
        data = req.body.data;
        console.log("jwt: ",jwt);

        
        const ExistingUser = await user.findOne({
            token:jwt.token
        })   
        if (ExistingUser){
            
            await ExistingUser.updateOne(data)
            
        }else{
            //await connect.disconnect()
            return false
        }
        
        //await connect.disconnect()
        return true

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return false

    }
    
    
}

export default editUser;