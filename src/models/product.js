
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';

const ProductSchema = new Schema({ //schema
    society:String,
    activity:String,
    activity_id:ObjectId,
    index:String,
    price:Number,
    type: String,
    inventory:Number,
    total:Number,
    status:String,
    gallery:Array,
    logo_url:String,
    link:Array,
    delivery_option:Array,
    payment_method:Array,
    
});
// ProductSchema.path('activity').ref(activity)
const product = model("products", ProductSchema);  //Creating a model

export default product;
