
import { Schema, model} from 'mongoose';
const CategorySchema = new Schema({ //schema
    category_name:String,
    id:String,
    can_delete:Boolean,
    child_category:[String],
    parent_category:[String],
    category_fieldtype:String,
    description:String,
    published:Boolean,
    hidden:Boolean
    
});
const category = model("categories",CategorySchema);  //Creating a model

export default category;