
import user from "../../models/user.js"
import website_info from "../../models/website_info.js";
import mongoose, { connect } from "mongoose";
import society from "../../models/society.js";
export async function getStaticInfo(req){

    var connect
    try{
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        return await website_info.find(
            {},
        ).then(async info=>{
            console.log(info)
            return await society.find(
                {},
                {
                    code:1,
                    society_eng:1,
                    society_chinese:1,
                }
            ).then(docs=>{
                var CodeToNameMap = {}
                docs.forEach(doc=>{
                    CodeToNameMap[doc.code]=doc
                })
                return {
                    id:"socMap",
                    content:CodeToNameMap,
                    name:"學會對照表 Soc Map",
                    content_type:"Object",
                    
                }
            }).then(customobj=>{
                info.push(customobj)
                console.log("info: ",info)
                return info
            })
            
        })
        
    }catch(e){
        console.log(e)
        //await connect.disconnect()
    }
    
}