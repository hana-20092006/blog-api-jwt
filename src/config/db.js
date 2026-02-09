// how to connect to MongoDB
// only DB connection logic lives here

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // mongoose.connect() returns a conection object

        console.log(`MongoDB connected: ${conn.connection.host}`) // conn -> mongoose connection, connection -> internal connection details, host -> the MongoDB server hostname, conn.connection.host = info about connection
    }
    catch (error) {
        console.error( "MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with a failure code
    }
};
export default connectDB;