import mongoose, {  connect  } from "mongoose";
import membership from "../../models/membership.js";
import society from "../../models/society.js";
import getUserOID from "../serverFunction/getuseroid.js";
//need su membership not yet expired and no in soc record
const getUserMembership = async (req)=>{
    var connect;
    console.log("calling memeber list",req.body)
    try {
        // return await mongoose.connect(String(process.env.CONNECTION_STRING)).then(async ()=>{
        //     return await getUserOID(req.body.tokeninfo.user_id).then(async id=>{
        //         return await membership.find(
        //             {user:id},
        //             {}
        //         ).then( async docs=>{
        //             return docs
        //         })
        //     })
        // })
        return await getUserOID(req.body.tokeninfo.user_id).then(async id=>{
            return await membership.find(
                {user:id},
                {update_record:0}
            ).populate( [{
                path: 'society', //field 
                // match: { society: doc._id },
                model: "societies", 
                select: 'college society_chinese society_eng code session  -_id',
                options: { lean: true },
                
            },])
            .then( async docs=>{
                console.log(`found memberships${docs}`)
                return docs
            })
        })
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    

    
}

export default getUserMembership;