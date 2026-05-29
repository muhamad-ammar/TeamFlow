import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/lib/auth/jwt";

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return Response.json({ error: "Invalid" }, { status: 401 });
    }

    const token = generateJWT(user._id.toString());

    return Response.json({ data: user, token });
}