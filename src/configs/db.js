import mongoose from "mongoose";
import utils from "../utils/index.js";

const connectDb = async () => {
    try {
        await mongoose.connect(utils.getEnv("URL_MONGODB"));
        console.log(`MongoDB Connected!`);
    } catch (error) {
        console.log(`Connection MongoDB Error`, error);
    }
};

export default { connectDb };
