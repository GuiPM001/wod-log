import Calendar from "@/components/calendar";
import MovementList from "@/components/movementList";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen mx-4 my-6 flex flex-col gap-6">
      <Link href="/wodPage">
        <Button>Add WOD</Button>
      </Link>
      <Calendar />
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
