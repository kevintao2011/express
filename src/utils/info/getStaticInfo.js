
import user from "../../models/user.js"
import website_info from "../../models/website_info.js";
import mongoose, { connect } from "mongoose";
export async function getStaticInfo(req){

    var connect
    try{
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        return await website_info.find(
            {},
        ).then(info=>{
            console.log(info)
            return info
        })
        
    }catch(e){
        console.log(e)
        await connect.disconnect()
    }
    
}