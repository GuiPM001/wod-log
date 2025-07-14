"use client";

import PageTitle from "@/components/pageTitle";
import Link from "next/link";
import React from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { useWod } from "@/app/context/WodContext";
import IconButton from "@/components/ui/iconButton";

export default function WodPage() {
  const { wod, removeTrainingBlock } = useWod();

  return (
    <div className="h-screen mx-4 my-6">
      <PageTitle title="New workout" />

      <div className="flex flex-col gap-4 my-4">
        <span>Training blocks</span>
        {wod?.trainingBlocks.map((t, index) => (
          <div className="min-h-28 w-full p-4 flex flex-col border border-gray-200 rounded-xl">
            <div className="flex flex-row justify-between items-start w-full mb-2">
              <span className="font-bold">{t.type}</span>
              <span>Time: {t.time} min</span>
              <span>Rounds: {t.rounds}</span>
              <IconButton onClick={() => removeTrainingBlock(index)}>
                <HiOutlineTrash size="20px" />
              </IconButton>
            </div>

              {t.movements.map(m => (
                <span className="text-sm text-gray-500">{m.reps} x {m.name}</span>
              ))}
          </div>
        ))}
      </div>

      <Link
        href="/formTrainingBlock"
        className="h-36 w-full flex items-center justify-center bg-gray-200 rounded-xl"
      >
        <HiOutlinePlus size="24px" color="#99a1af" />
      </Link>
    </div>
  );
}
