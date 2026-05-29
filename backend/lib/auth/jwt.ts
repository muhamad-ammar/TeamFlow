import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function generateJWT(userId: string) {
    return jwt.sign({ userId }, secret, { expiresIn: "7d" });
}

export function verifyJWT(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, secret) as { userId: string };
    } catch {
        return null;
    }
}