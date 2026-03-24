import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export function withAdminAuth(handler: (req: Request, context: any) => Promise<NextResponse>) {
  return async (req: Request, context: any) => {
    try {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      await connectToDB();
      const user = await User.findOne({ clerkId: userId });
      
      if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
      }

      return handler(req, context);
    } catch (error) {
      console.error("Auth error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
}
