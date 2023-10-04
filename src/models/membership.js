import mongoose, { Schema, model} from 'mongoose';
const recordSchema = new Schema({ //schema
    user:{type:mongoose.Types.ObjectId,ref:'users'},
    method:String,
    
},{timestamps:true});
const MembershipSchema = new Schema({ //schema
    user:{type:mongoose.Types.ObjectId,ref:'users'},
    society:{type:mongoose.Types.ObjectId,ref:'societies'},
    role:String,
    expiry_date:Date,
    update_record:recordSchema
    
});

const membership = model("memberships",MembershipSchema);  //Creating a model
export default membership;