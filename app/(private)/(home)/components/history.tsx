"use client";

import { useMonthlyWods } from "@/app/context/MonthlyWodsContext";
import React from "react";
import WodBlock from "./wodBlock";

export default function History() {
  const { wods } = useMonthlyWods();

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>History</h2>

      {wods.map((w, wodIndex) => (
        <div
          key={`${w.date}-${wodIndex}`}
          className="min-h-28 w-full p-4 flex flex-col border border-gray-200 rounded-xl gap-2"
        >
          <div className="flex flex-row justify-between text-gray-400 font-semibold">
            <span>WOD</span>
            <span>{formatDate(w.date)}</span>
          </div>

          {w.trainingBlocks.map((t, i) => (
            <WodBlock training={t} key={`${t.type}-${i}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
