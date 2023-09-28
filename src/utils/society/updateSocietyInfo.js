import mongoose, {  connect  } from "mongoose";
import society from "../../models/society.js";
// for show product in carousell 
const updateSocietyInfo = async (req)=>{
    var connect;
    console.log()
    try {
        return await mongoose.connect(String(process.env.CONNECTION_STRING)).then(async()=>{
            console.log(body)
            return await society.updateOne(
                { code:req.data.code},
                {[req.data.field_name]:req.data.field_name}
            ).then(doc=>{
                if (doc){
                    return true
                }else{
                    return false
                }
            })
        });
        
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return false

    }
    

    
}

export default updateSocietyInfo;