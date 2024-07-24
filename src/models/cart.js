import { ObjectId } from 'mongodb';
import mongoose, { Schema, model} from 'mongoose';
import { ProductVariantSchema } from './product.js';


const detailsSchema = new Schema({
    prod_id:{type:ObjectId,ref:'product_variants'}, 
    quantity:{type:Number,default:1}, // 
})
const CartSchema = new Schema({ //schema
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    products:{type:[detailsSchema],default:[]}
});
const Cart = model("cart",CartSchema);  //Creating a model

export default Cart;

/** 
 * [
  {
    "prod_id": {
      "_id": "669dd06d8d2d68e9ab63756f",
      "name": "xs",
      "total_sales": 0,
      "quantity": 1,
      "price": 1,
      "is_limited": true,
      "sku": "207-30-000-000",
      "ref_product": {
        "_id": "669dd06d8d2d68e9ab63756d",
        "code": "207",
        "ref_society": "64a554cd1596cf843e6a5b4a",
        "ref_category": "64f89228b7e47bd0fb9ab46e",
        "product_name_chi": "test",
        "product_type": "sovernirs",
        "product_img_url": [],
        "product_link": [],
        "product_description_chi": "123",
        "created_at": "2024-07-22T03:22:21.680Z",
        "created_by": "64e709f3e0b623601acd5064",
        "is_limited": true,
        "tags": [],
        "allowed_coupon": [],
        "sku": "207-30-000",
        "published": true,
        "session": 30,
        "options": [
          {
            "text": "size",
            "option": [
              "xs"
            ],
            "_id": "669dd06d8d2d68e9ab63756e"
          }
        ],
        "hidden": false,
        "is_bundle": false,
        "bundle_list": [],
        "major_only": false,
        "product_list": [
          "669dd06d8d2d68e9ab63756f"
        ],
        "modification": [],
        "__v": 0
      },
      "__v": 0
    },
    "quantity": 2,
    "_id": "669e19a7eb6e496b45941d1e"
  }
]
*/