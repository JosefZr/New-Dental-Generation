import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://joesef:kKs0kqHojWzGx4O7@nodeexpressprojects.qxn6z.mongodb.net/lotfi?retryWrites=true&w=majority&appName=nodeExpressProjects';
        console.log('MONGO_URI:', uri);  // Debug check

        const connection = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB', error.message);
        process.exit(1);
    }
};
