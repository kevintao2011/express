
import { Schema, model} from 'mongoose';

import { ObjectId } from 'mongodb';

const SocietySchema = new Schema({ //schema
    // chinese name of society
    society_chinese:String,
    // Eng name of society
    society_eng:String,
    // paymelink of socity
    payme_link:String,
    college:String,
    session:String,
    exco_name_chinese:String,
    exco_name_eng:String,
    status:String,
    exco_list:Array,
    session:String,
    past_exco:Array,
    activities:Array,
    code:String,
    member:Array,
    type:String
    
});
// ProductSchema.path('activity').ref(activity)
const society = model("societies", SocietySchema);  //Creating a model

export default society;
