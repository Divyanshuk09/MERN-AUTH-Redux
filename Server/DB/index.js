
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONOGODB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process on failure        
    }
}

export default connectDB;