
import mongoose,{ Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
import product from './product.js';
import { object } from 'firebase-functions/v1/storage';
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
    create_method:{type:String,default:"create-product"},
    sold_price:Number,
    status:{type:String,default:""},//for-sale , sold , hold (not yet paid)
    // hidden:{type:Boolean,default:false}
    unique_props:{type:object,default:{}}, 
    /*
    * unique_props:{Zone:A,Row:1,Column:2}

    */
});


// ProductSchema.path('activity').ref(activity)
const stock = model("stocks", StockSchema);  //Creating a model
export default stock;
