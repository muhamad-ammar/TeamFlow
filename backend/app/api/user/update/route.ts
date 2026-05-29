import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/User";
import { verifyJWT } from "@/lib/auth/jwt";

export async function PUT(req: Request) {
    await connectDB();

    const token = req.headers.get("Authorization")?.split(" ")[1];
    const decoded = verifyJWT(token!);

    if (!decoded) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const user = await User.findByIdAndUpdate(
        decoded.userId,
        { $set: body },
        { new: true }
    ).select("-password");

    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ data: user });
}