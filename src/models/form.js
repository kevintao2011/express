import society from "./society";
import mongoose, { Schema, model} from 'mongoose';
const MapSchema = new Schema({
    title:String,
    valie:String
})
const QuestionSchema = new Schema({
    field_name:String,
    field_type:String,
    single:Boolean,
    field_value:[String],
    field_props:String,
    split_by:String,
    
})
const FormSchema = new Schema({ //schema
    categories:Array,
    title_map:[MapSchema],
    questions:[QuestionSchema],
    form_title:String,
    form_description:String,
    ref_society:[{type:mongoose.Types.ObjectId,ref:'societies'}]
});
const category = model("forms",FormSchema);  //Creating a model

export default category;