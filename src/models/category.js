
import { Schema, model} from 'mongoose';
const CategorySchema = new Schema({ //schema
    categories:Array
});
const category = model("categories",CategorySchema);  //Creating a model

export default category;