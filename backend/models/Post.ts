import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, maxlength: 1000 },

        likes: [
            { type: Schema.Types.ObjectId, ref: "User", default: [] },
        ],
        likesCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Post ||
    mongoose.model("Post", PostSchema);