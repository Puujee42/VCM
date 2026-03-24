import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

// Base slot configuration (in a real app, you might fetch this from a Settings collection)
const BASE_TIMES = [
  "10:00", "10:10", "11:00", "13:00", 
  "14:00", "15:30", "16:30", "18:00"
];

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date"); // e.g. '2025-10-31'

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    // Find all bookings for this specific date
    // Consider both 'pending' and 'confirmed' as taking up a slot
    const existingBookings = await Booking.find({
      date: date,
      status: { $in: ['pending', 'confirmed'] }
    }).select("time");

    const takenTimes = existingBookings.map((b: any) => b.time);

    // Filter out the taken times
    const availableTimes = BASE_TIMES.filter(time => !takenTimes.includes(time));

    return NextResponse.json({ availableTimes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching available times:", error);
    return NextResponse.json({ error: "Failed to fetch times" }, { status: 500 });
  }
}
