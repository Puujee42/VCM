import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import User from "@/lib/models/User";
import { getAuthUserId } from "@/lib/authHelpers";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const {
      email,
      password,
      city,
      fullName,
      phone,
      // Existing profile fields
      sex,
      dob,
      placeOfBirth,
      nationality,
      religion,
      mobile,
      skype,
      bestTime,
      street,
      number,
      postalCode,
      country,
      fatherProfession,
      motherProfession,
      brothers,
      sisters,
      hobbies,
      languages,
      childcareExperience,
      householdTasks,
      motivation,
    } = data;

    const profileUpdate: any = {
      fullName,
      phone,
      "profile.sex": sex,
      "profile.dob": dob ? new Date(dob) : null,
      "profile.placeOfBirth": placeOfBirth,
      "profile.nationality": nationality,
      "profile.religion": religion,
      "profile.phone": phone,
      "profile.mobile": mobile,
      "profile.skype": skype,
      "profile.bestTime": bestTime,
      "profile.address.street": street,
      "profile.address.number": number,
      "profile.address.postalCode": postalCode,
      "profile.address.city": city,
      "profile.address.country": country,
      "profile.fatherProfession": fatherProfession,
      "profile.motherProfession": motherProfession,
      "profile.brothers": brothers,
      "profile.sisters": sisters,
      "profile.hobbies": hobbies,
      "profile.languages": languages,
      "profile.childcareExperience": childcareExperience,
      "profile.householdTasks": householdTasks,
      "profile.motivation": motivation,
    };

    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 });
      }
      profileUpdate.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      profileUpdate.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: profileUpdate },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!user) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}