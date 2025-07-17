"use client";

import React, { ChangeEvent, useState } from "react";
import { TrainingBlockMovement } from "@/core/types/TrainingBlock";
import {
  HiDotsVertical,
  HiDuplicate,
  HiOutlineTrash,
  HiX,
} from "react-icons/hi";
import MovementItem from "./movementItem";
import IconButton from "./ui/iconButton";

interface MovementFormProps {
  index: number;
  movement: TrainingBlockMovement;
  movementChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeMovement: (index: number) => void;
  duplicateMovement: (movement: TrainingBlockMovement) => void;
}

export default function MovementForm({
  index,
  movement,
  movementChange,
  removeMovement,
  duplicateMovement,
}: MovementFormProps) {
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
    <div className="mb-8">
      <div className="flex flex-row justify-between">
        <MovementItem movement={movement} />
        <IconButton onClick={() => setMenuOpen(true)}>
          <HiDotsVertical size="20px" />
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

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-end justify-center">
          <div className="bg-white rounded-t-3xl h-56 w-full flex flex-col gap-4 relative py-4 px-6">
            <div className="w-full flex flex-row justify-center text-gray-500 mb-4">
              <span className="text-sm font-semibold">OPTIONS</span>
              <div className="absolute right-6">
                <IconButton onClick={() => setMenuOpen(false)}>
                  <HiX size="18px"/>
                </IconButton>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <button
                className="flex flex-row gap-2 items-center cursor-pointer"
                onClick={handleRemoveMovement}
              >
                <HiOutlineTrash size="20px" />
                <span>Remove movement</span>
              </button>
              <button
                className="flex flex-row gap-2 items-center cursor-pointer"
                onClick={handleDuplicateMovement}
              >
                <HiDuplicate size="20px" />
                <span>Duplicate movement</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
