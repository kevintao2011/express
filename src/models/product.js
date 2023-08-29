
import { Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
const ProductVariantSchema = new Schema({ //schema
    name:String,
    totalSales: {type: Number,default:0},
    price:Number,
    index:Number,
    inventory:Number,
    icon_url:String
});

const ProductSchema = new Schema({ //schema
    code:String, //soc-code
    product_name:String,
    product_name_eng:String,
    type: String,
    status:String, //selling//ended
    img_url:String,
    product_icon:String,
    link:Array,
    description_chi:String,
    description_eng:String,
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    updatedAt:Date,
    // delivery_option:Array,
    // no_variants:Boolean,
    variants:[ProductVariantSchema]
});
// ProductSchema.path('activity').ref(activity)
const product = model("products", ProductSchema);  //Creating a model

const vSchema = Schema(ProductVariantSchema)

export default {product};
