
import mongoose, { Mongoose, Schema, model} from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserSchema } from '../user.js';
import coupon,{ couponSchema } from './coupon.js';
import society from '../society.js';
import allProducts,{allProductsSchema} from './allProducts.js';

const ModificationSchema = new Schema({ //schema
    action:String, //[changePrice, rename , added new children]
    updatedAt:Date, //record modification 
    modifiedBy:UserSchema
});

const ProductSchema = new Schema({ //schema
    code:String, //soc-code
    ref_society:{type:mongoose.Types.ObjectId,ref:'societies'},
    ref_category:{type:String},
    product_name_chi:String, //product chinese name
    product_name_eng:String, //product eng name
    product_type: String,   //membership, ticket , virtual , real
    product_status:String, //selling//ended
    product_img_url:[String], //product url
    product_link:[{type:[String],default:[]}], // link of form/post
    product_description_chi:String, // product description in chinese
    product_description_eng:String, // product description in english
    created_at:{ 
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    created_by:{type:mongoose.Types.ObjectId,ref:"users"},
    has_variant:Boolean,
    is_limited:Boolean,// some is unlimited, such as membership
    inventory:Number,
    total_sales:{type:Number,default:0},
     // check 
    unit_price:Number,
    modification:{type:[ModificationSchema],default:[]}, // record user
    tags:{type:[String],default:[]}, //for searching
    allowed_coupon:[{type:mongoose.Types.ObjectId,ref:'coupons',default:[]}],
    sku:String,

    is_bundle:{type:Boolean },
    bundle_list:[],

    parent:{type:mongoose.Types.ObjectId,ref:"new_products"},
    child_products:[{type:mongoose.Types.ObjectId,ref:"new_products"}],
    
    
});
ProductSchema.pre(
    'init', async function(next){
        for (let index = 0; index < this.quantity ; index++) {
            await allProducts.create(
              {
                //this ref to ProductSchema
                ref_product:this.ObjectId,
                sku:this.ObjectId+String(index),
              }
            )
        }
    }
)
// ProductSchema.path('activity').ref(activity)
const product = model("new_products", ProductSchema);  //Creating a model

export {ProductSchema};
export default product;