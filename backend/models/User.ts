import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        bio: String,
        avatarUrl: String,

        followers: [
            { type: Schema.Types.ObjectId, ref: "User", default: [] },
        ],
        following: [
            { type: Schema.Types.ObjectId, ref: "User", default: [] },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model("User", UserSchema);