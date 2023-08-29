
import mongoose, { Mongoose, Schema, model} from 'mongoose';
import activity from './activity.js';
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
    ref_society:{Type:mongoose.Schema.Types.ObjectId,ref:society},
    product_name:String, //product chinese name
    product_name_eng:String, //product eng name
    type: String,   //membership, ticket , virtual , real
    status:String, //selling//ended
    img_url:[String], //product url
    link:{Type:[String],default:[]}, // link of form/post
    description_chi:String, // product description in chinese
    description_eng:String, // product description in english
    created_at:{ 
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    isLimited:Boolean,// some is unlimited, such as membership
    Inventory:Number,
    Totalsales:Number,
    parent:{ObjectId}, // check 
    modification:[ModificationSchema], // record user
    tags:[String], //for searching
    allowed_coupon:[{Type:mongoose.Schema.Types.ObjectId,ref:coupon}],
    is_bundle:{Type:Boolean },
    bundle_list:[]
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