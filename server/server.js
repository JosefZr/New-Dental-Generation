import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.js"
// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();  // Ensure MongoDB connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server failed to start:', error);
    }
};

start();
