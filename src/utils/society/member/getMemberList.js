import mongoose, {  connect  } from "mongoose";
import membership from "../../../models/membership.js";
import society from "../../../models/society.js";
// for show product in carousell 
const getMemberList = async (req)=>{
    var connect;
    console.log("calling memeber list",req.body)
    try {
        // return await mongoose.connect(String(process.env.CONNECTION_STRING)).then(async()=>{
            
        // });
        return await society.findOne(
            {code:req.body.data.code},
        ).then( async doc=>{
            return await membership.find(
                {},
            ).populate(
                [{
                    path: 'society', //field in membership
                    // match: { society: doc._id },
                    model: "societies", 
                    select: 'code -_id',
                    options: { lean: true },
                    // select: 'code' // Optionally, you can specify the fields to select from the referenced document
                    // path: 'user', //field in membership
                    // // match: { society: doc._id },
                    // model: "users", 
                    // select: ['code','username'] // Optionally, you can specify the fields to select from the referenced document
                },
                {
                    path: 'user', //field in membership
                    // match: { society: doc._id },
                    model: "user", 
                    select: 'username sid -_id',
                    // options: { lean: true }, // Optionally, you can specify the fields to select from the referenced document
                },],
                
                )
                // .populate({
                //     path: 'users',
                //     match: { society: doc._id },
                //     // strictPopulate: false
                //     // match: { society: doc._id },
                // })
                .then(docs=>{
                if (docs){
                    return docs
                }else{
                    return false
                }
            })
        })
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // await connect.disconnect()
        return false

    }
    

    
}

export default getMemberList;