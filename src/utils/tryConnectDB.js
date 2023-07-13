import mongoose from "mongoose";
const tryConnectDB = async ()=>{
    var connect
    try {
        connect = await mongoose.connect("mongodb+srv://lingusuwebsite:6X5ZJZrNVxShxLzp@database.wqsyfyy.mongodb.net/?retryWrites=true&w=majority");
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
            
        );
        await connect.disconnect()
        return true;
        // await connect.disconnect();
        // console.log(
        //     "Database disconnected: ",
            
        // );
    } catch (err) {
        console.log(err);
        await connect.disconnect();
        process.exit(1);
        
    }
}

export default tryConnectDB;


