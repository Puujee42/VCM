import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import Booking from "@/lib/models/Booking";
import Application from "@/lib/models/Application";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch User, Bookings, Applications in parallel
    const [user, bookings, applications] = await Promise.all([
      User.findOne({ clerkId: clerkUser.id }),
      Booking.find({ userId: clerkUser.id }).sort({ createdAt: -1 }),
      Application.find({ userId: clerkUser.id }).sort({ createdAt: -1 })
    ]);

    if (!user) {
      return NextResponse.json({ 
          user: {
              fullName: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Guest User",
              email: clerkUser.emailAddresses[0]?.emailAddress || "",
              role: "guest",
              profile: null
          },
          activity: [],
          bookings: bookings || [],
          applications: applications || [],
          isNewUser: true
      }, { status: 200 });
    }

    const dashboardData = {
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            studentId: user.studentId,
            country: user.country,
            step: user.step,
            badges: user.badges || [],
            points: user.points || 0,
            profile: user.profile || null
        },
        activity: user.activityHistory || [],
        bookings: bookings || [],
        applications: applications || []
    };

    return NextResponse.json(dashboardData, { status: 200 });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}