import {
  trainingBlockLabels,
  TrainingBlockType,
} from "@/core/enums/TrainingBlockType";
import { TrainingBlock } from "@/core/types/TrainingBlock";
import React from "react";

interface WodBlockProps {
  training: TrainingBlock;
}

export default function WodBlock({ training }: WodBlockProps) {
  const roundText = training.type === TrainingBlockType.ForTime ? 'rounds in ' : 'rounds of';

  return (
    <div className="w-full">
      <span className="inline-block font-bold mr-1">
        {trainingBlockLabels[training.type]}:
      </span>
      {training.type === TrainingBlockType.Skill ? (
        <span>{training.movements.map((m) => m.name).join(", ")}</span>
      ) : (
        <>
          <span>
            {training.rounds} {roundText} {training.time} minutes
          </span>
          <div className="text-gray-400 font-normal text-sm px-2">
            {training.movements.map((m, i) => (
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
  );
}
