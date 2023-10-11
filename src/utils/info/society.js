
import society from "../../models/society.js";
import user from "../../models/user.js"
import mongoose, { connect } from "mongoose";
export async function getSociety(){
    var connect
    try{
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log("get society")
        const a = await society.find(
            {}
            ,{
                "_id":0,
            }
        ).then(soc=>{
            const mapped = soc.map(entry=>{
                // console.log(entry,{ [entry.code]: entry })
                return { [entry.code]: entry };
            })
            
            const obj = mapped.reduce((acc, cur) => {
                const key = Object.keys(cur)[0];
                acc[key] = cur[key];
                return acc;
            }, {});
            
            return(obj)
            
        })
        // console.log(a)
        //await connect.disconnect()
        return a
    }catch{
        //await connect.disconnect()
    }
    
    
    
    
}