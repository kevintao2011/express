
import mongoose,{ Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
const ProductVariantSchema = new Schema({ //schema
    name:String,
    total_sales:{type:Number,default:0},
    quantity:{type:Number,default:0},
    price:{type:Number,default:0},
    is_limited:{type:Boolean,default:true},
    sku:String
});

const OptionSchema = new Schema({ //schema
    text:String, //e.g. size
    option:[String], //e.g. s,m,l
});

const ModificationSchema = new Schema({ //schema
    action:String, //[changePrice, rename , added new children]
    updatedAt:Date, //record modification 
    modifiedBy:{type:mongoose.Types.ObjectId,ref:'societies'}
});

const ProductSchema = new Schema({ //schema
    code:String, //soc-code
    ref_society:{type:mongoose.Types.ObjectId,ref:'societies'},
    ref_category:{type:mongoose.Types.ObjectId,ref:'categories'},
    product_name_chi:String, //product chinese name
    product_type: String,   //membership, ticket , virtual , real
    product_img_url:[String], //product url
    product_link:[Object], // link of form/post
    product_description_chi:String, // product description in chinese
    product_description_eng:String, // product description in english
    created_at:{ 
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    created_by:{type:mongoose.Types.ObjectId,ref:"users"},
    modification:{type:[ModificationSchema],default:[]}, // record user
    is_limited:{type:Boolean,default:true},// some is unlimited, such as membership
    tags:{type:[String],default:[]}, //for searching
    allowed_coupon:[{type:mongoose.Types.ObjectId,ref:'coupons',default:[]}],
    sku:String,
    published:{type:Boolean },
    session:{type:Number},
    options:[OptionSchema],
    hidden:{type:Boolean,default:false},
    ticket_sku:String,
    is_bundle:{type:Boolean,default:false},
    bundle_list:[],
    product_list:{type:[ProductVariantSchema],default:[]},
});
// ProductSchema.path('activity').ref(activity)
const product = model("products", ProductSchema);  //Creating a model

ProductSchema.methods.findSocMembership = function(code){return this.findOne({code:code})}
export default product;
export {ProductSchema,ProductVariantSchema}
