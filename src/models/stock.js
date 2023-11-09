
import mongoose,{ Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
import product from './product.js';
const StockSchema = new Schema({ //schema
    // modification:{type:[ModificationSchema],default:[]}, // record user
    sku:{type:String,unique:true},
    ref_society:{type:mongoose.Types.ObjectId,ref:'societies'},
    ref_product:{type:mongoose.Types.ObjectId,ref:'products'},
    created_at:{ 
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    created_by:{type:mongoose.Types.ObjectId,ref:'users'},
    owner:{type:mongoose.Types.ObjectId,ref:'users'},
    spot_goods:{type:Boolean,default:true}, //spot_goods = if have actual products on hand
    sold_price:Number,
    status:{type:String,default:""}//for-sale , sold , hold (not yet paid)
});
// ProductSchema.path('activity').ref(activity)
const stock = model("stocks", StockSchema);  //Creating a model
export default stock;
