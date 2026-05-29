import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";

export async function GET(req: Request) {
    await connectDB();

    const userId = req.headers.get("x-user-id");

    const user = await User.findById(userId).select("following");

    const ids = [userId, ...user.following];

    const posts = await Post.find({
        authorId: { $in: ids },
    })
        .populate("authorId", "name avatarUrl")
        .sort({ createdAt: -1 });

    return Response.json({ data: posts });
}