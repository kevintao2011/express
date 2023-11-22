import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';

const ActivitySchema = new Schema({ //schema

    code: String,
    activity_code:String,
    end_date: Date,
    start_date: Date,
    start_time: String,
    single_date:Boolean,
    end_time: String,
    activity_name: String,
    ref_society:{type:Schema.Types.ObjectId, ref:'societies'},
    participants: [{type:Schema.Types.ObjectId, ref:'users'}],
    packages: [{type:Schema.Types.ObjectId, ref:'products'}],
    ticket_product: {type:Schema.Types.ObjectId, ref:'products'},
    payment_method: String,
    description: String,
    posterURL:[String],
    description_chi:String,
    description_eng:String,
    status:String,
    session:Number,
    links:Array,
    calendarMap:[EventSchema],
    ref_ticket_sku:{type:String},
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    updatedAt:Date,
    
});
const activity = model("activities", ActivitySchema);  //Creating a model

export default activity;
