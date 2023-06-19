
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';

const ProductSchema = new Schema({ //schema

    activity:ObjectId,
    index:String,
    price:Number,
    type: String,
    inventory:Number,
    total:Number,
    status:String,
    gallery:Array,
    logo_url:String,
    link:Array,
    delivery_option:Array
    
});
const product = model("product", ProductSchema);  //Creating a model

export default product;
