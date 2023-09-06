
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
import user from './user.js';
const websiteInfoSchema = new Schema({ //schema
    name:String,
    content:[],
    content_type:String,
    modified_by:{type:Schema.Types.ObjectId,ref:user},
    modified_date:Date
});
// ProductSchema.path('activity').ref(activity)
const websiteInfo = model("website_infos", websiteInfoSchema);  //Creating a model

export {websiteInfoSchema};
export default websiteInfo ;
