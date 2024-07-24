
import mongoose,{ Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
import stock from './stock.js';
const ProductVariantSchema = new Schema({ //schema
    name:String,
    total_sales:{type:Number,default:0},
    quantity:{type:Number,default:0},
    price:{type:Number,default:0},
    is_limited:{type:Boolean,default:true},
    sku:String,
    ref_product:{type:mongoose.Types.ObjectId,ref:"products"},
    // added not not yet do 
    img_url:String,// for preview and show selected option
    valid:Boolean// is there this product or not 
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
    ref_category:{}, //type:mongoose.Types.ObjectId,ref:'categories'
    product_name_chi:String, //product chinese name
    product_type: String,   //membership, ticket , virtual , real
    product_img_url:[String], //product url
    product_link:[Object], // link of form/post
    product_description_chi:String, // product description in chinese
    product_description_eng:String, // product description in english
    group:String,
    created_at:{ // creation date
        type:Date,
        immutable:true,
        default:()=>Date.now(),
    },
    created_by:{type:mongoose.Types.ObjectId,ref:"users"}, // record who create
    modification:{type:[ModificationSchema],default:[]}, // record user
    is_limited:{type:Boolean,default:true},// some is unlimited, such as membership
    tags:{type:[String],default:[]}, //for searching
    allowed_coupon:[{type:mongoose.Types.ObjectId,ref:'coupons',default:[]}], //should done in coupon
    sku:String, //storing sku of the product
    published:{type:Boolean }, 
    session:{type:Number}, // start selling in which year
    options:[OptionSchema], // provided options, each option lead to a product variant in product list
    hidden:{type:Boolean,default:false}, //shown in website or not
    ticket_sku:String,
    is_bundle:{type:Boolean,default:false},
    bundle_list:[], 
    major_only:{type:Boolean,default:false}, //specified for target group user
    product_list:{type:[ObjectId],ref:"product_variants",default:[]}//{type:[ObjectId],ref:"product_variants",default:[]},//type:[ObjectId],ref:"product_models",default:[]
});



// })


const product = model("products", ProductSchema);  //Creating a model
const product_variants = model("product_variants", ProductVariantSchema);  //Creating a model

product_variants.watch().on('change',async change=>{
    console.log("change",change)
    if (change.operationType === 'insert') {
        const subproductDetails = change.fullDocument;
        await product.findByIdAndUpdate(
            {_id:subproductDetails.ref_product},
            { $push: { product_list: subproductDetails._id } },
            { new: true }
        );
        await stock.create(
            {
                sku:subproductDetails.sku,
                ref_society:subproductDetails.ref_society,
                created_at:Date.now(),
                created_by:subproductDetails.created_by,
                create_method:"auto-generate",
                status:"for-sale",
            }
        )
    }else if(change.operationType === 'delete'){
        const subproductDetails = change.fullDocument;
        await product.findByIdAndUpdate(
            {_id:subproductDetails.ref_product},
            { $pull: { product_list: subproductDetails._id } },
            { new: true }
        );
    }
})

product.watch().on('change',async change=>{
    console.log("change",change)
    if (change.operationType === 'delete') {
        const productDetails = change.fullDocument;
        await product_variants.deleteMany({ref_product:productDetails._id})
    }
})  

ProductSchema.statics.findprod = function(id){
    return this.findOne({"product_list._id": ObjectId(id)})
};

export default product;
export {ProductSchema,product_variants,ProductVariantSchema}