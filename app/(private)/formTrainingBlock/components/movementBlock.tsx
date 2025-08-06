"use client";

import MovementItem from "@/components/movementItem";
import IconButton from "@/components/ui/iconButton";
import { TrainingBlockMovement } from "@/core/types/TrainingBlockMovement";
import React, { ChangeEvent, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import MovementMenu from "./movementMenu";

interface MovementBlockProps {
  index: number;
  movement: TrainingBlockMovement;
  movementChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeMovement: (index: number) => void;
  duplicateMovement: (movement: TrainingBlockMovement) => void;
  duplicateMovementDisabled: boolean;
}

export default function MovementBlock({
  index,
  movement,
  movementChange,
  removeMovement,
  duplicateMovement,
  duplicateMovementDisabled,
}: MovementBlockProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleRemoveMovement = () => {
    setMenuOpen(false);
    removeMovement(index);
  };

  const handleDuplicateMovement = () => {
    setMenuOpen(false);
    duplicateMovement(movement);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex flex-row justify-between">
        <MovementItem movement={movement} />
        <IconButton onClick={() => setMenuOpen(true)}>
          <HiDotsVertical size="20px" />
        </IconButton>
      </div>

      <div className="grid grid-cols-2 justify-end text-center text-gray-500 mt-2 w-2/3 justify-self-center">
        <span className="text-xs mb-2">KG</span>
        <span className="text-xs mb-2">REPS</span>

        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="kg"
          value={movement.kg ?? 0}
          onChange={(e) => movementChange(e, index)}
          className="text-center font-bold outline-none"
          onFocus={(e) => e.target.select()}
        />

        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="reps"
          value={movement.reps ?? 0}
          onChange={(e) => movementChange(e, index)}
          className="text-center font-bold outline-none"
          onFocus={(e) => e.target.select()}
        />
      </div>

      {menuOpen && (
        <MovementMenu
          close={() => setMenuOpen(false)}
          handleDuplicateMovement={handleDuplicateMovement}
          handleRemoveMovement={handleRemoveMovement}
          duplicateMovementDisabled={duplicateMovementDisabled}
        />
      )}
    </div>
  );
}
