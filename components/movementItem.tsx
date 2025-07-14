import { Movement } from "@/core/types/Movement";
import React from "react";

interface MovementItemProps {
  movement: Movement;
}

export default function MovementItem({ movement }: MovementItemProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={`https://img.youtube.com/vi/${movement.youtubeId}/maxresdefault.jpg`}
        alt={movement.name}
        className="w-1/3"
      />
      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold">{movement.name}</span>
        <span className="text-sm">{movement.type}</span>
      </div>
    </div>
  );
}
