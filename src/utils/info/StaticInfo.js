
import user from "../../models/user.js"
import website_info from "../../models/website_info.js";
import mongoose, { connect } from "mongoose";
import society from "../../models/society.js";
import { wrapResponse } from "../serverFunction/basicfunction.js";

class StaticInfo{
    async getStaticInfo(specify_ids=[]){
        console.log(`getting static infos with ids,${specify_ids}`)
        const matchids = specify_ids.legnth<1?null:specify_ids
        try{
            //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
            return await website_info.find(
                specify_ids.length<1?{}:{id:{$in:specify_ids}},
            ).then(async info=>{
                // console.log(info)
                if(specify_ids.includes("socMap")){
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
                        // console.log("info: ",info)
                        return wrapResponse(true,info) 
                    })
                }
                else{
                    return wrapResponse(true,info) 
                }
                
            })
            
        }catch(e){
            console.log(e)
            return wrapResponse(false,e.name) 
            //await connect.disconnect()
        }
        
    }
}

export default StaticInfo