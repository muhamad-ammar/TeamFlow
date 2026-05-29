import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/lib/auth/jwt";

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();

    const exists = await User.findOne({ email });

    if (exists) {
        return Response.json({ error: "User exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    const token = generateJWT(user._id.toString());

    return Response.json({ data: user, token });
}