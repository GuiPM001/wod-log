import Link from "next/link";
import Button from "@/components/ui/button";
import Calendar from "@/app/(public)/(home)/components/calendar";
import History from "@/app/(public)/(home)/components/history";

export default function Home() {
  return (
    <div className="mx-4 my-6 flex flex-col">
      <Link href="/wodPage">
        <Button>Add WOD</Button>
      </Link>
      <Calendar />
      <History />
    </div>
  );
}

// <iframe
//   src="https://www.youtube.com/embed/_-9_46by2JI"
//   title="The Handstand"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//   referrerPolicy="strict-origin-when-cross-origin"
//   allowFullScreen
//   style={{ width: "100%" }}
// ></iframe>

// <MovementList />
