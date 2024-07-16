import mongoose from 'mongoose';
const MONGO_URI = "mongodb://127.0.0.1:27017/Classroom";
export const connectDb = async () => {
    await mongoose.connect(MONGO_URI, {})
        .then(() => {
            console.log("DB connect");
        })
        .catch((err) => {
            console.error("Error in DB connection:", err);
        });
}