import moment from 'moment';
import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';

const EventSchema = new Schema({

    // BEGIN:"VCALENDAR", 
    // VERSION:"2.0",
    // BEGIN:"VEVENT",
    URL:{type:String,default:""},
    DTSTART: {type:Date , default:moment().utcOffset(8).toDate()}, //Z indicates the use of UTC
    DTEND:{type:Date , default:moment().utcOffset(8).toDate()},//`TZID=Asia/Hong_Kong;VALUE=DATE-TIME:${moment().utcOffset(8).toDate()}`
    SUMMARY: {type:String,default:""},
    DESCRIPTION: {type:String,default:"this event has no description"},
    LOCATION: {type:String,default:"TBA"},
    // END:"VEVENT",
    // END:"VCALENDAR"
})

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
