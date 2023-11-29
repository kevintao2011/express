import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';


const ProductGroupSchema = new Schema({ //schema
    group_name:String,
    hidden:{type:Boolean,default:false},
    ancestors:[String],
    parent:[String],
});
const ProductGroup = model("product_groups", ProductGroupSchema);  //Creating a model

class ProdGroup{

    generateTreeArrayForRs(){
        //1. filter get all root
        //2. for each root get acentor in recusion
        //if need add new node then
        ProductGroup.find() 
    }
}
export default ProductGroup
export {ProductGroupSchema,ProdGroup}
