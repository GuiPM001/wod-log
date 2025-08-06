import Link from "next/link";
import Button from "@/components/ui/button";
import Calendar from "@/app/(private)/(home)/components/calendar";
import History from "@/app/(private)/(home)/components/history";
import { Wod } from "@/core/types/Wod";
import { cookies } from "next/headers";
import { wodService } from "@/core/services/wod.service";

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) throw new Error("Unauthenticated user");

  const wods: Wod[] = await wodService.getAll(userId);

  return (
    <div className="mx-4 my-6 flex flex-col">
      <Link href="/wodPage">
        <Button>Add WOD</Button>
      </Link>
      <Calendar wods={JSON.stringify(wods)} />
      <History />
    </div>
  );
}
