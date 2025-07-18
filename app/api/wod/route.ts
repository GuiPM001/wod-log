import { wodService } from "@/core/services/wod.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
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
    const userId = getUserId(request);
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date") || new Date().toISOString();

    const wods = await wodService.getByMonth(date, userId);

    return NextResponse.json(wods, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

function getUserId(request: NextRequest) {
  return request.headers.get("x-user-id") as string;
  
  // if (!userId)
  //   return NextResponse.json(
  //     { error: "Usuário não autenticado" },
  //     { status: 401 }
  //   );

  // return userId;
}
