import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{

      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`\n mongodb connected ${connectionInstance.connection.host}`)


    }
    catch(error){
        console.log("mongodb connection err",error);
        process.exit(1);  //search it 

    }
}


console.log (DB_NAME)

export default connectDB