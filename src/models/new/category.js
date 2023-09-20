
import { Schema, model} from 'mongoose';
const CategorySchema = new Schema({ //schema
    category_name:Array,
    child_catergories:Array,
    parent_categories:Array,
    can_delete:{type:Boolean},
    id:{unique:true},
});
const category = model("categories",CategorySchema);  //Creating a model

export default category;