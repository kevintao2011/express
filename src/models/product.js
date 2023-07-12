
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
const ProductVariantSchema = new Schema({ //schema
    variant:String,
    totalSales:Number,
    price:Number,
    gallery:Array,
    inventory:Number
});

const ProductSchema = new Schema({ //schema
    code:String, //soc-code
    product_name:String,
    type: String,
    status:String, //selling//ended
    img_url:String,
    link:Array,
    // delivery_option:Array,
    // no_variants:Boolean,
    variants:Array
});
// ProductSchema.path('activity').ref(activity)
const product = model("products", ProductSchema);  //Creating a model

export default product;
