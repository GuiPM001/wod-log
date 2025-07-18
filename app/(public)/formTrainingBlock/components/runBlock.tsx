import IconButton from "@/components/ui/iconButton";
import { TrainingBlockMovement } from "@/core/types/TrainingBlockMovement";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface RunBlockProps {
  index: number;
  movement: TrainingBlockMovement;
  movementChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeMovement: (index: number) => void;
}

export default function RunBlock({
  index,
  movement,
  movementChange,
  removeMovement,
}: RunBlockProps) {
  const distanceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (movement.distance === 0) {
      distanceRef.current?.focus();
    }
  }, []);

  return (
    <div className="flex flex-row justify-between items-center border-b border-gray-200 py-6">
      <span className="text-lg font-semibold ml-4">{movement.name}</span>

      <div className="flex items-center justify-center">
        <input
          ref={distanceRef}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="distance"
          value={movement.distance ?? 0}
          className="text-center outline-none w-10 bg-transparent font-semibold"
          onFocus={(e) => e.target.select()}
          onChange={(e) => movementChange(e, index)}
        />
        <span className="ml-1">meters</span>
      </div>

      <IconButton onClick={() => removeMovement(index)}>
        <HiOutlineTrash size="20px" />
      </IconButton>
    </div>
  );
}
