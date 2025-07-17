"use client";

import React, { ChangeEvent, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import InputTime from "@/components/ui/inputTime";
import PageTitle from "@/components/pageTitle";
import MovementList from "./components/movementList";
import MovementForm from "./components/movementForm";
import { HiOutlinePlus } from "react-icons/hi";
import { Movement } from "@/core/types/Movement";
import { useRouter } from "next/navigation";
import { useWod } from "@/app/context/WodContext";
import { TrainingBlock } from "@/core/types/TrainingBlock";
import { TrainingBlockMovement } from "@/core/types/TrainingBlockMovement";
import {
  trainingBlockLabels,
  TrainingBlockType,
} from "@/core/enums/TrainingBlockType";

export default function FormTrainingBlock() {
  const initialState = {
    type: TrainingBlockType.AMRAP,
    time: 0,
    rounds: 0,
    movements: [],
  };

  const [listOpen, setListOpen] = useState<boolean>(false);
  const [form, setForm] = useState<TrainingBlock>(initialState);

  const router = useRouter();
  const { addTrainingBlock } = useWod();

  const addMovement = (newMovement: Movement) => {
    const formMovement: TrainingBlockMovement = {
      ...newMovement,
      kg: 0,
      reps: 1,
      previous: "30kg",
    };

    setForm({ ...form, movements: [...form.movements, formMovement] });
    setListOpen(false);
  };

  const movementChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let updatedMovements = updatedAllSameMoves(e, index);
    setForm({ ...form, movements: updatedMovements });
  };

  const updatedAllSameMoves = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    const currentMovement = form.movements[index];
    
    if (isNaN(numericValue)) return form.movements;

    if (name === "reps") {
      return form.movements.map((m, i) =>
        i === index ? { ...m, reps: numericValue } : m
      );
    }

    return form.movements.map((m) =>
      m.youtubeId === currentMovement.youtubeId ? { ...m, kg: numericValue } : m
    );
  };

  const formChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const onSave = () => {
    addTrainingBlock(form);
    router.back();
  };

  const removeMovement = (index: number) => {
    const newArray = form.movements.filter((_, i) => i !== index);
    setForm({ ...form, movements: newArray });
  };

  const duplicateMovement = (movement: Movement) => {
    let sameMovement = form.movements
      .filter((m) => m.youtubeId === movement.youtubeId)
      .at(-1);

    if (!sameMovement) return;

    sameMovement = {
      ...sameMovement,
      reps: Math.max(1, sameMovement.reps - 1),
    };

    setForm({ ...form, movements: [...form.movements, sameMovement] });
  };

  return (
    <div className="h-full mx-4 my-6 flex flex-col gap-4">
      {listOpen ? (
        <MovementList
          closeList={() => setListOpen(false)}
          addMovement={addMovement}
        />
      ) : (
        <>
          <div className="flex flex-row justify-between items-center w-full">
            <PageTitle title="Training block" />
            <Button onClick={onSave}>Save</Button>
          </div>

          <div className="flex flex-row gap-2">
            <Select
              value={form.type}
              onChange={formChange}
              name="type"
              label="Type"
              options={[
                {
                  label: trainingBlockLabels[TrainingBlockType.AMRAP],
                  value: TrainingBlockType.AMRAP,
                },
                {
                  label: trainingBlockLabels[TrainingBlockType.EMOM],
                  value: TrainingBlockType.EMOM,
                },
                {
                  label: trainingBlockLabels[TrainingBlockType.RFT],
                  value: TrainingBlockType.RFT,
                },
                {
                  label: trainingBlockLabels[TrainingBlockType.ForTime],
                  value: TrainingBlockType.ForTime,
                },
                {
                  label: trainingBlockLabels[TrainingBlockType.Strength],
                  value: TrainingBlockType.Strength,
                },
                {
                  label: trainingBlockLabels[TrainingBlockType.Skill],
                  value: TrainingBlockType.Skill,
                },
              ]}
            />
            <Input
              name="rounds"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              label="Rounds"
              value={form.rounds}
              onChange={formChange}
              onFocus={(e) => e.target.select()}
            />

            <InputTime
              name="time"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              label="Time per round"
              value={form.time}
              onChange={formChange}
              onFocus={(e) => e.target.select()}
            />
          </div>

          <div>
            {form.movements.map((m, index) => (
              <MovementForm
                key={`${m.youtubeId}-${index}`}
                index={index}
                movement={m}
                movementChange={movementChange}
                removeMovement={removeMovement}
                duplicateMovement={duplicateMovement}
              />
            ))}
          </div>

          <Button onClick={() => setListOpen(true)}>
            <HiOutlinePlus />
            <span className="ml-1">Add movement</span>
          </Button>
        </>
      )}
    </div>
  );
}
