
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';

const websiteInfoSchema = new Schema({ //schema
    name:String,
    content:[]
});
// ProductSchema.path('activity').ref(activity)
const websiteInfo = model("website_info", websiteInfoSchema);  //Creating a model

const vSchema = Schema(websiteInfoSchema)

export default {websiteInfo};
