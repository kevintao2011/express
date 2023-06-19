import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';


const ActivitySchema = new Schema({ //schema

    "society": String,
    "end_date": Date,
    "start_date": Date,
    "activity_name": String,
    "participants": Array,
    "packages": Array,
    "payment_method": String
    
});
const activity = model("activities", ActivitySchema);  //Creating a model

export default activity;
