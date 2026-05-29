import { connectDB } from "@/lib/db/mongodb";
import Post from "@/models/Post";

export async function DELETE(req: Request) {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    const { postId } = await req.json();

    await Post.findByIdAndUpdate(postId, {
        $pull: { likes: userId },
        $inc: { likesCount: -1 },
    });

    return Response.json({ success: true });
}