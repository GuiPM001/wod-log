import React from "react";
import movements from "@/data/movements.json";
import { Movement } from "@/core/types/Movement";
import MovementItem from "@/components/movementItem";

interface MovementListProps {
  closeList: () => void;
  addMovement: (movement: Movement) => void;
}

export default function MovementList({
  closeList,
  addMovement,
}: MovementListProps) {
  const sortedMovements: Movement[] = movements.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center mb-6">
        <button onClick={closeList} className="text-primary absolute left-3 cursor-pointer">
          Cancel
        </button>
        <span>Add Movement</span>
      </div>

      {sortedMovements.map((m) => (
        <button
          onClick={() => addMovement(m)}
          className="border-b border-gray-200 py-6 cursor-pointer"
          key={m.youtubeId}
        >
          <MovementItem movement={m} />
        </button>
      ))}
    </div>
  );
}
