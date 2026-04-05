import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import Booking from "@/lib/models/Booking";
import Application from "@/lib/models/Application";
import Event from "@/lib/models/Events";
import Lesson from "@/lib/models/Lesson";
import { getAuthUserId } from "@/lib/authHelpers";

export async function GET() {
  try {
    await connectToDB();

    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch User, Bookings, Applications, and Attended Events in parallel
    const [user, bookings, applications, attendedEvents, availableEvents, allLessons] = await Promise.all([
      User.findById(userId),
      Booking.find({ userId }).sort({ createdAt: -1 }),
      Application.find({ userId }).sort({ createdAt: -1 }),
      Event.find({ attendees: userId }).sort({ date: -1 }),
      Event.find({ 
        attendees: { $ne: userId }, 
        status: 'upcoming',
        date: { $gte: new Date() }
      }).sort({ date: 1 }).limit(10),
      Lesson.find({ status: 'active' }).sort({ createdAt: -1 })
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
        profile: user.profile || null,
        phone: user.phone || null,
        hasPassword: !!user.password,
        affiliation: user.affiliation || null,
        program: user.program || null,
      },
      activity: user.activityHistory || [],
      bookings: bookings || [],
      applications: applications || [],
      attendedEvents: attendedEvents || [],
      availableEvents: availableEvents || [],
      lessons: allLessons.map((lesson: { toObject: () => any; attendees: any[] }) => ({
        ...lesson.toObject(),
        isUnlocked: lesson.attendees.some((id: { toString: () => string }) => id.toString() === userId)
      }))
    };

    return NextResponse.json(dashboardData, { status: 200 });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}