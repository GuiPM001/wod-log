import IconButton from "@/components/ui/iconButton";
import React from "react";
import { HiDuplicate, HiOutlineTrash, HiX } from "react-icons/hi";

interface MovementMenuProps {
  close: () => void;
  handleDuplicateMovement: () => void;
  handleRemoveMovement: () => void;
  duplicateMovementDisabled: boolean;
}

export default function MovementMenu({
  close,
  handleDuplicateMovement,
  handleRemoveMovement,
  duplicateMovementDisabled,
}: MovementMenuProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-end justify-center">
      <div className="bg-white rounded-t-3xl h-56 w-full flex flex-col gap-4 relative py-4 px-6">
        <div className="w-full flex flex-row justify-center text-gray-500 mb-4">
          <span className="text-sm font-semibold">OPTIONS</span>
          <div className="absolute right-6">
            <IconButton onClick={close}>
              <HiX size="18px" />
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
          {!duplicateMovementDisabled && (
            <button
              className="flex flex-row gap-2 items-center cursor-pointer"
              onClick={handleDuplicateMovement}
            >
              <HiDuplicate size="20px" />
              <span>Duplicate movement</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
