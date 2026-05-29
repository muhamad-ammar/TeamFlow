import User from "@/models/User";
import { verifyJWT } from "@/lib/auth/jwt";

export async function GET(req: Request) {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyJWT(token);

    if (!decoded) {
        return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user });
}