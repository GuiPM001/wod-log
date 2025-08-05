import { getCachedMovements, setCachedMovements } from "@/core/cache/movementsCache";
import { movementService } from "@/core/services/movement.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    let movements = getCachedMovements();

    if (!movements) {
      const data = await movementService.getAll();
      setCachedMovements(data);
      movements = data;
    }

    return NextResponse.json(movements, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const jsonRequest = await request.json();

    const newWod = await movementService.save(jsonRequest);

    return NextResponse.json(newWod, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
