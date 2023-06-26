import mongoose, { connect } from "mongoose";
import user from "../../models/user.js";

const editUser = async (req)=>{
    var connect;
    var jwt;
    var data;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        jwt = req.body.jwt;
        data = req.body.data;
        console.log("editUser jwt: ",jwt);

        
        const ExistingUser = await user.findOne(
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

        if (ExistingUser){
            await ExistingUser.updateOne(data)
        }else{
            connect.disconnect()
            return false
        }
        
        connect.disconnect()
        return true

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    
    
}

export default editUser;