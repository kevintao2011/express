import { Schema, model} from 'mongoose';
const logSchema = new Schema({ //schema
    Action:String
});
const category = model("categories",CategorySchema);  //Creating a model

export default category;