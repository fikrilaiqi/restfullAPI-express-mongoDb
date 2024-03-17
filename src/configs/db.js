import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env["URL_MONGODB"]);
        console.log(`MongoDB Connected!`);
    } catch (error) {
        console.log(`Connection MongoDB Error`, error);
    }
};

export default { connectDb };
