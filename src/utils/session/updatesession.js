import mongoose, { connect } from "mongoose";
import user from "../../models/user.js";

const updateSession = async (req)=>{
    var connect;
    var jwt;
    var data;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        const jwt = req.body.user.jwt;

        const tokeninfo = req.body.tokeninfo
        
        console.log("tokeninfo.uid ",tokeninfo.uid);
        console.log("tokeninfo.jwt ",jwt);
        console.log("tokeninfo.exp ",new Date(tokeninfo.exp * 1000));

        
        const ExistingUser = await user.findOne(
            {uid:tokeninfo.uid}
            // ,{
            //     "_id": 0,
            //     "exp": 0,
            //     "last_sign_in": 0,
            //     "__v": 0,
            //     "created": 0,
            //     "token": 0,
            // }
        )
        console.log("found",ExistingUser);
        if (ExistingUser){
            const result = await ExistingUser.updateOne({
                token:jwt,
                exp:new Date(tokeninfo.exp * 1000),
                last_sign_in:new Date(tokeninfo.iat * 1000),
            })
            console.log("updated",result);
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

export default updateSession;