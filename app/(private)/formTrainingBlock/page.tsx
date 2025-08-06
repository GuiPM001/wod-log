"use client";

import React, { ChangeEvent, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import InputTime from "@/components/ui/inputTime";
import PageTitle from "@/components/pageTitle";
import MovementList from "./components/movementList";
import RunBlock from "./components/runBlock";
import MovementBlock from "./components/movementBlock";
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
    const sameMovement = form.movements.find(
      (m) => m.youtubeId === newMovement.youtubeId
    );

    const formMovement: TrainingBlockMovement = {
      ...newMovement,
      kg: sameMovement?.kg ?? 0,
      reps: sameMovement?.reps ?? 1,
      previous: "0kg",
      distance: null,
    };

    setForm({ ...form, movements: [...form.movements, formMovement] });
    setListOpen(false);
  };

  const addRun = () => {
    const run: TrainingBlockMovement = {
      name: "Run",
      type: "Other",
      youtubeId: "",
      kg: null,
      reps: null,
      previous: null,
      distance: 0,
    };

    setForm({ ...form, movements: [...form.movements, run] });
  };

  const movementChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    const currentMovement = form.movements[index];

    if (isNaN(numericValue)) return form.movements;

    setForm({
      ...form,
      movements: updateMoves(currentMovement, index, name, numericValue),
    });
  };

  const updateMoves = (
    currentMovement: Movement,
    index: number,
    name: string,
    value: number
  ) => {
    return form.movements.map((movement, i) => {
      const isSameMovement = movement.youtubeId === currentMovement.youtubeId;

      const shouldUpdate = (name === "kg" && isSameMovement) || (name !== "kg" && i === index);

      return shouldUpdate ? { ...movement, [name]: value } : movement;
    });
  };

  const formChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    if (value === TrainingBlockType.Skill) {
      return setForm({
        ...form,
        rounds: 0,
        time: 0,
        type: value,
      });
    }

    return setForm({ ...form, type: value });
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
            <Button onClick={onSave} disabled={!form.movements.length}>
              Save
            </Button>
          </div>

          <div className="flex flex-row gap-2">
            <Select
              value={form.type}
              onChange={selectChange}
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
              disabled={form.type === TrainingBlockType.Skill}
            />

            <InputTime
              name="time"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              label={
                form.type === TrainingBlockType.ForTime
                  ? "Total time"
                  : "Time per round"
              }
              value={form.time}
              onChange={formChange}
              onFocus={(e) => e.target.select()}
              disabled={form.type === TrainingBlockType.Skill}
            />
          </div>

          <div className="flex flex-col">
            {form.movements.map((m, index) =>
              m.name === "Run" ? (
                <RunBlock
                  key={`${m.youtubeId}-${index}`}
                  index={index}
                  movement={m}
                  movementChange={movementChange}
                  removeMovement={removeMovement}
                />
              ) : (
                <MovementBlock
                  key={`${m.youtubeId}-${index}`}
                  index={index}
                  movement={m}
                  movementChange={movementChange}
                  removeMovement={removeMovement}
                  duplicateMovement={duplicateMovement}
                  duplicateMovementDisabled={
                    form.type === TrainingBlockType.Skill &&
                    form.movements.length > 0
                  }
                />
              )
            )}
          </div>

          <div className="flex flex-row gap-2">
            <Button
              onClick={addRun}
              color="secondary"
              disabled={
                form.type === TrainingBlockType.Skill ||
                form.type === TrainingBlockType.Strength
              }
            >
              Add run
            </Button>

            <Button
              onClick={() => setListOpen(true)}
              disabled={
                form.type === TrainingBlockType.Skill &&
                form.movements.length > 0
              }
            >
              <HiOutlinePlus />
              <span className="ml-1">Add movement</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
