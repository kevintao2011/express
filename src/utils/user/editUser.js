import mongoose, { connect } from "mongoose";
import user from "../../models/user.js";



const editUser = async (req)=>{
    var connect;
    var data;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        
        data = req.body.data;
        console.log("editUser data: ",req.body.tokeninfo.uid,data);

        data.first_login=false
        data.cohort = new Date(data.cohort)
        const DuplicateName = await user.findOne(
            {username:data.username}
        )
        const DuplicateSID = await user.findOne(
            {sid:data.sid}
        )
        if (DuplicateName){
            console.log("duplicated name")
            connect.disconnect()
            return {code:"duplicated-username"}
        }
        else if (DuplicateSID){
            console.log("duplicated sid")
            connect.disconnect()
            return {code:"duplicated-sid"}
        }else{
            
            const dbuser = await user.findOneAndUpdate(
                {uid:req.body.tokeninfo.uid},
                data,{
                    new: true,
                    projection:{
                        societies:1,
                        contact:1,
                        cohort:1,
                        username:1,
                        major:1,
                        email:1,
                        gender:1,
                        sid:1,
                        created:1

                    }
                }
            ).then(async updatedUser=>{
                console.log("updatedUser",updatedUser)
                return updatedUser
                
            })
            return {code:"success",user:dbuser}
            
            
        }

        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return {code:"operation-error"}

    }
    
    
}

export default editUser;