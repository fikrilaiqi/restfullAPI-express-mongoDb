import { Schema, model } from "mongoose";
const bookmarkSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: "user", require: true },
        blog_id: { type: Schema.Types.ObjectId, ref: "blog", require: true },
    },
    {
        timestamps: true,
    }
);

export default model("bookmark", bookmarkSchema);
