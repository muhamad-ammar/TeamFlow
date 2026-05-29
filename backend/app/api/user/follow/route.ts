import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    const { targetUserId } = await req.json();

    await User.findByIdAndUpdate(userId, {
        $addToSet: { following: targetUserId },
    });

    await User.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: userId },
    });

    return Response.json({ success: true });
}