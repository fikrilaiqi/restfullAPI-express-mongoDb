import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

export default model("user", userSchema);
