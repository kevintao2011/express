import mongoose, { connect } from "mongoose";
import user from "../../models/user.js";
import society from "../../models/society.js";



const editUser = async (req)=>{
    var connect;
  
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        
        
        console.log("editUser data: ",req.body.data);

        req.body.data.first_login=false
        req.body.data.cohort = new Date(req.body.data.cohort)
        // req.body.data.societies = req.body.data.societies
        const DuplicateName = await user.findOne(
            {username:req.body.data.username}
        )
        console.log(req.body.sid)
        const DuplicateSID = await user.findOne(
            {sid:req.body.data.sid}
        )
        if (DuplicateName){
            console.log("duplicated name")
            await connect.disconnect()
            return {code:"duplicated-username"}
        }
        else if (DuplicateSID){
            console.log("duplicated sid")
            await connect.disconnect()
            return {code:"duplicated-sid"}
        }else{
            //update user profile info
            const dbuser = await user.findOneAndUpdate(
                {uid:req.body.tokeninfo.uid},
                req.body.data,{
                    new: true,
                    projection:{
                        // societies:1,
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
            //add user sid to society
            await society.findOneAndUpdate(
                {code:req.body.data.major},
                {$push: { member: req.body.data.sid  }}
            ).then(soc=>{
                console.log("soc",soc)
            })
            await connect.disconnect()
            return {code:"success",user:dbuser}
            
            
            
        }

        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return {code:"operation-error"}

    }
    
    
}

export default editUser;