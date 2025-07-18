import { authService } from "@/core/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const loginRequest = await request.json();

    const loginResponse = await authService.login(loginRequest);

    return NextResponse.json(loginResponse, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
