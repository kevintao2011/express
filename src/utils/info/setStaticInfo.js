
import user from "../../models/user.js"
import website_info from "../../models/website_info.js";
import mongoose, { connect } from "mongoose";
export  default async function setStaticInfo(req){

    var connect
    try{
        console.log("setStaticInfo")
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        const userid = await user.find(
            {}
        )
        return await website_info.findOne(
            {name:req.body.data.name},
        ).then(async doc=>{
            const keys = Object.keys(req.body.data)
            keys.forEach(key=>{
                console.log("set",key,"to",doc[key])
                doc[key]=req.body.data[key]
            })
            doc.modified_by=req.body.user._id
            doc.modified_date=Date.now()
            console.log("doc",doc)
            await doc.save().then(doc=>{
                console.log("modified doc",doc)
            })
        })
        
    }catch(e){
        console.log(e)
        //await connect.disconnect()
    }
    
}