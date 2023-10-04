import mongoose, { Schema, model} from 'mongoose';
const EditLogSchema = new Schema({ //schema
    action:String,
    collection:String,
    target:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
});
const EditLog = model("edit_log",EditLogSchema);  //Creating a model

export default EditLog;