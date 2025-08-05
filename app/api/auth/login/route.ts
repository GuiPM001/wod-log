import { authService } from "@/core/services/auth.service";
import { LoginRequest } from "@/core/types/LoginRequest";
import { LoginResponse } from "@/core/types/LoginResponse";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const loginRequest: LoginRequest = await request.json();

    const loginResponse: LoginResponse = await authService.login(loginRequest);

    const cookieStore = await cookies();
    await saveCookie(cookieStore, 'authToken', loginResponse.token, loginRequest.rememberMe);
    await saveCookie(cookieStore, 'userId', loginResponse.user._id.toString(), loginRequest.rememberMe);

    return NextResponse.json(loginResponse, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

const saveCookie = async (
  cookieStore: ReadonlyRequestCookies,
  cookieName: string,
  cookieValue: string,
  rememberMe: boolean,
) => {
  const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 60 * 60; // 7 days or 1 hour
  cookieStore.set(cookieName, cookieValue, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge,
  });
};
