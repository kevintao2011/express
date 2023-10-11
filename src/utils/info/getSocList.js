import mongoose, {  connect  } from "mongoose";
import society from "../../models/society.js";

const getSocList = async (req)=>{
    console.log("running getSocList",mongoose.connection.readyState , req.body)
    var connect;


    try {
        // connect = await mongoose.connection.asPromise()
        // console.log("current connection",mongoose.connection.readyState)
        // if(mongoose.connection.readyState==0){
        //     console.log("getSocActivity connecting")
        //     //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        // }
        // else{
        //     console.log("getSocActivity adding connection")
            
        //     connect = mongoose
            
        //     console.log("getSocActivity added connection",mongoose.connection.readyState)
        // }
        

        const a = await society.find(
            // {"ig":{$exists:true}}
            {}
            ,{
                college:1,
                type:1,
                society_eng:1,
                society_chinese:1,
                exco_name_chinese:1,
                exco_name_eng:1,
                status:1,
                ig:1,
                code:1,
                
            } //,_id:0
        ).then(async soc=>{
            
            
            //await connect.disconnect()
            console.log("getSocList function exe sucess")
            return soc
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return false

    }
    

    
}

export default getSocList;