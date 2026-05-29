import { connectDB } from "@/lib/db/mongodb";
import Post from "@/models/Post";

export async function POST(req: Request) {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    const { content } = await req.json();

    const post = await Post.create({
        authorId: userId,
        content,
    });

    return Response.json({ data: post });
}