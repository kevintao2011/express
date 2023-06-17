import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect("mongodb+srv://lingusuwebsite:6X5ZJZrNVxShxLzp@database.wqsyfyy.mongodb.net/?retryWrites=true&w=majority");
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
            
        );
        return true;
        // await connect.disconnect();
        // console.log(
        //     "Database disconnected: ",
            
        // );
    } catch (err) {
        console.log(err);
        process.exit(1);
        
    }
}

export default connectDB;


