import { wodService } from "@/core/services/wod.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    const jsonRequest = await request.json();

    const newWod = await wodService.saveWod(jsonRequest, userId);

    return NextResponse.json(newWod, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || new Date().toISOString();

    const wods = await wodService.getByMonth(date, userId);

    return NextResponse.json(wods, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

async function getUserId(request: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    throw new Error("Could not get user information, please try again later.");
  }

  return userId;
}
