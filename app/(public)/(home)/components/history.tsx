"use client";

import { useMonthlyWods } from "@/app/context/MonthlyWodsContext";
import {
  trainingBlockLabels,
  TrainingBlockType,
} from "@/core/enums/TrainingBlockType";
import React from "react";

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
            <div key={`${t.type}-${i}`} className="w-full">
              <span className="inline-block font-bold mr-1">
                {trainingBlockLabels[t.type]}:
              </span>
              {t.type === TrainingBlockType.Skill ? (
                <span>{t.movements.map((m) => m.name).join(", ")}</span>
              ) : (
                <>
                  <span>
                    {t.rounds} rounds of {t.time} minutes
                  </span>
                  <div className="text-gray-400 font-normal text-sm px-2">
                    {t.movements.map((m, i) => (
                      <span
                        key={`${m.youtubeId}-${i}`}
                        className="px-2 first:pl-0 last:pr-0 border-r last:border-r-0 border-gray-300"
                      >
                        {m.name === "Run"
                          ? `${m.distance}m run`
                          : `${m.reps} x ${m.name}`}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
