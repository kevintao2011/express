import mongoose, {  connect  } from "mongoose";
import society from "../../models/society.js";

const getoidbycode = async (code)=>{
    console.log("find SocietyOid",code)
    var connect;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        var SocietyOid
        SocietyOid = await society.findOne(
            {code:code},
            {
                _id:1
            }
        )

        if (SocietyOid){
            console.log(SocietyOid)
            
        }else{
           console.log("no such SocietyOid")
        }
        // //await connect.disconnect()
        console.log("handleSocietyOidLogin function exe sucess",mongoose.connection.readyState)
        
        return SocietyOid
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return false

    }
    

    
}

export default getoidbycode;