import { authService } from "@/core/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const profileRequest = await request.json();

    await authService.register(profileRequest);

    return NextResponse.json({ status: 201 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
