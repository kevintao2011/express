
import { Schema, model} from 'mongoose';

import { ObjectId } from 'mongodb';

const JupasSchema = new Schema({ //schema
    jupas_code:String,
    college:String,
    type:String,
    code:String,
    short_name:String,
    full_name:String,
    ref_societý:{type:ObjectId,ref:"societies"},
});
// ProductSchema.path('activity').ref(activity)
const jupas = model("jupas", JupasSchema);  //Creating a model

export default jupas;
