import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/User";
import mongoose, { Types } from "mongoose";


export async function GET(req: Request) {
    await connectDB();
    const url = new URL(req.url);


    const userId = new Types.ObjectId(url.searchParams.get("id") || undefined);



    try {
        // 1. Validate input first
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return new Response(
                JSON.stringify({ error: "Invalid user id" }),
                { status: 400 }
            );
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Read the users from the JSON file
        const user = await User.findById(userId).lean();
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { password, ...safeUser } = user;

        // Return the paginated posts as a JSON response
        return new Response(
            JSON.stringify({ data: safeUser }),
            { status: 200 }
        );

    }
    catch (error) {
        console.error("Error fetching user:", error);

        return new Response(
            JSON.stringify({ error: "Failed to fetch user" }),
            { status: 500 }
        );

    }
}



export async function PUT(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    // 1. Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: "Invalid user id" }),
        { status: 400 }
      );
    }

    // 2. Parse body (IMPORTANT: await)
    const body = await req.json();

    // 3. Safe update fields only
    const updateData = {
      ...(body.username && { username: body.username }),
      ...(body.bio && { bio: body.bio }),
      ...(body.avatarUrl && { avatarUrl: body.avatarUrl }),
    };

    // 4. Update in DB (NO LOOPS, NO FILES)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    // 5. Handle not found
    if (!updatedUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // 6. Remove sensitive data
    const { password, ...safeUser } = updatedUser;

    // 7. Simulate delay (optional testing only)
    await new Promise((r) => setTimeout(r, 500));

    return new Response(
      JSON.stringify({ data: safeUser }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Update error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500 }
    );
  }
}