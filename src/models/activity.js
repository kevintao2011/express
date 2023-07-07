import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';


const ActivitySchema = new Schema({ //schema

    "code": String,
    "end_date": Date,
    "start_date": Date,
    "start_time": String,
    "single_date":Boolean,
    "end_time": String,
    "activity_name": String,
    "participants": Array,
    "packages": Array,
    "payment_method": String,
    "description": String,
    "status":String,
    "links":Array,
    
});
const activity = model("activities", ActivitySchema);  //Creating a model

export default activity;
