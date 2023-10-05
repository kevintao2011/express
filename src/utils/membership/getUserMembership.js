import mongoose, {  connect  } from "mongoose";
import membership from "../../models/membership.js";
import society from "../../models/society.js";
import getUserOID from "../serverFunction/getuseroid.js";
//need su membership not yet expired and no in soc record
const getUserMembership = async (req)=>{
    var connect;
    console.log("calling memeber list",req.body)
    try {
        return await getUserOID(req.body.tokeninfo.user_id).then(async id=>{
            return await membership.find(
                {user:id},
                {}
            ).then( async docs=>{
                return docs
                // return await membership.findOne(
                //     {society:doc._id ,expiry_date:{$gt:Date.now()}},
                //     {_id:0}
                // ).then(doc=>{
                //     if (doc){
                        
                //     }else{
                //         return false
                //     }
                // })
            })
        })
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // await connect.disconnect()
        return false

    }
    

    
}

export default getUserMembership;