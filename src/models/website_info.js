
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';

const websiteInfoSchema = new Schema({ //schema
    name:String,
    content:[],
    content_type:String,
});
// ProductSchema.path('activity').ref(activity)
const websiteInfo = model("website_infos", websiteInfoSchema);  //Creating a model

export {websiteInfoSchema};
export default websiteInfo ;
