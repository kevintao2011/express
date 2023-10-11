import mongoose, {  connect  } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import activity from "../../models/activity.js";
import society from "../../models/society.js";

const getSocUser = async (req)=>{
    console.log("running getSocUser",mongoose.connection.readyState , req.body)
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
            {code:req.body.id}
            ,{member:1} //,_id:0
        ).then(async member=>{
            console.log("document",member)
            member = member[0].member
            if (member){
                console.log(member)
            }
            
            //await connect.disconnect()
            console.log("getSocUser function exe sucess")
            return member
        })

        return a
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return false

    }
    

    
}

export default getSocUser;