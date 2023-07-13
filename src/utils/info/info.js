
import user from "../../models/user.js"
import mongoose, { connect } from "mongoose";
export async function getUserSociety(req){
    var connect
    try{
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log("get user society",req.body.tokeninfo.uid)
        const soc = await user.findOne(
            {uid:req.body.tokeninfo.uid}
            ,{
                "societies": 1,
                "_id":0,
            }
        )
        if (soc){
            return soc.societies
        }else{
            return {}
        }
    }catch(e){
        console.log(e)
        await connect.disconnect()
    }
    
    
    
    // .then(doc=>{
    //     console.log('soc',doc.get('societies'))
   
    // })
    // user.findOne(
    //     {uid:String(req.body.tokeninfo.uid)},
    //     {
    //         "_id": 0,
    //         "exp": 0,
    //         "last_sign_in": 0,
    //         "__v": 0,
    //         "created": 0,
    //         "token": 0,
    //     }
    // )
}