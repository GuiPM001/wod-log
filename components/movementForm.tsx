import React, { ChangeEvent } from "react";
import { TrainingBlockMovement } from "@/core/types/TrainingBlock";
import { HiOutlineTrash } from "react-icons/hi";
import MovementItem from "./movementItem";
import IconButton from "./ui/iconButton";

interface MovementFormProps {
  index: number;
  movement: TrainingBlockMovement;
  movementChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeMovement: (index: number) => void;
}

export default function MovementForm({
  index,
  movement,
  movementChange,
  removeMovement
}: MovementFormProps) {
  return (
    <div className="mb-8 relative">
      <div className="flex flex-row justify-between">
        <MovementItem key={movement.youtubeId} movement={movement} />
        <IconButton onClick={() => removeMovement(index)}>
          <HiOutlineTrash size="20px" />
        </IconButton>
      </div>

      <div className="grid grid-cols-3 text-center text-gray-500 mt-2">
        <span className="text-xs mb-2">ANTERIOR</span>
        <span className="text-xs mb-2">KG</span>
        <span className="text-xs mb-2">REPS</span>

        <span>{movement.previous}</span>

        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="kg"
          value={movement.kg}
          onChange={(e) => movementChange(e, index)}
          className="text-center font-bold outline-none"
          onFocus={(e) => e.target.select()}
        />

        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="reps"
          value={movement.reps}
          onChange={(e) => movementChange(e, index)}
          className="text-center font-bold outline-none"
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}
