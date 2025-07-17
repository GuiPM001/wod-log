"use client";

import { useMonthlyWods } from "@/app/context/MonthlyWodsContext";
import { trainingBlockLabels } from "@/core/enums/TrainingBlockType";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import React, { useState } from "react";

export default function History() {
  const { wods } = useMonthlyWods();

  const [movementsShown, setMovementsShown] = useState<number | null>(null);

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
          <div className="flex flex-row justify-between text-gray-400 font-semibold mb-2">
            <span>WOD</span>
            <span>{formatDate(w.date)}</span>
          </div>

          {w.trainingBlocks.map((t, i) => (
            <div key={`${t.type}-${i}`} className="w-full">
              <span className="inline-block font-bold mr-1">
                {trainingBlockLabels[t.type]}:
              </span>
              <span>
                {t.rounds} rounds of {t.time} minutes
              </span>

              {movementsShown === wodIndex && (
                <div className="text-gray-400 font-normal text-sm mb-2 px-2">
                  {t.movements.map((m, i) => (
                    <span
                      key={`${m.youtubeId}-${i}`}
                      className="px-2 first:pl-0 last:pr-0 border-r last:border-r-0 border-gray-300"
                    >
                      {m.reps} x {m.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {movementsShown === wodIndex ? (
            <button
              className="mt-2 flex flex-row justify-center items-center gap-1 text-gray-400 text-sm"
              onClick={() => setMovementsShown(null)}
            >
              <HiChevronDoubleUp size="14px" />
              <span>Hide movements</span>
            </button>
          ) : (
            <button
              className="mt-2 flex flex-row justify-center items-center gap-1 text-gray-400 text-sm"
              onClick={() => setMovementsShown(wodIndex)}
            >
              <HiChevronDoubleDown size="14px" />
              <span>Show movements</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
