import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';
import user from './user.js';

const ActivitySchema = new Schema({ //schema

    code: String,
    end_date: Date,
    start_date: Date,
    start_time: String,
    single_date:Boolean,
    end_time: String,
    activity_name: String,
    participants: [{type:Schema.Types.ObjectId, ref:'users'}],
    packages: [{type:Schema.Types.ObjectId, ref:'products'}],
    payment_method: String,
    description: String,
    posterURL:String,
    description_chi:String,
    description_eng:String,
    status:String,
    links:Array,
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    updatedAt:Date,
    
});
const activity = model("activities", ActivitySchema);  //Creating a model

export default activity;
