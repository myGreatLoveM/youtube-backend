import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log("-------------------------------------------");
        console.log("Database connection established");
        console.log(`DB_Host : ${connInstance.connection.host}`)
        
    } catch (err) {
        console.log("-------------------------------------------");
        console.log(`Internal Server Error while connecting to database --> ${err}!!!`);
        process.exit(1);
    }
}


export default connectDB