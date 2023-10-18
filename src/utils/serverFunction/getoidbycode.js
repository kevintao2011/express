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
const getoidandsessionbycode = async (code)=>{
    console.log("find SocietyOid",code)
    var connect;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));

        return await society.findOne(
            {code:code},
            {
                _id:1,
                session:1,
            }
        ).then((doc)=>{
            console.log(doc)
            const SocietyOid=doc._id
            const session=doc.session
            if (SocietyOid){
                console.log(SocietyOid)
                
            }else{
                console.log("no such SocietyOid")
            }
            // //await connect.disconnect()
            console.log("handleSocietyOidLogin function exe sucess",mongoose.connection.readyState)
            console.log("iod and session",SocietyOid.toString(),session)
            return [SocietyOid,session]
        })
        

        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // //await connect.disconnect()
        return err

    }
    

    
}

export{getoidandsessionbycode}
export default getoidbycode;