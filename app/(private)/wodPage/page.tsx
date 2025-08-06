"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/iconButton";
import PageTitle from "@/components/pageTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { useWod } from "@/app/context/WodContext";
import { ErrorResponse } from "@/core/types/ErrorResponse";
import { trainingBlockLabels } from "@/core/enums/TrainingBlockType";
import { api } from "@/core/services/api";
import LoadingSpinner from "@/components/ui/loadingSpinner";

export default function WodPage() {
  const { wod, setWod, setInitialState, removeTrainingBlock } = useWod();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const onSave = async () => {
    try {
      setError(null);
      setLoading(true);

      await api.post("/wod", wod);

      router.replace("/");
    } catch (e: unknown) {
      setError(e as ErrorResponse);
      setLoading(false);
    }
  };

  useEffect(() => {
    api.get("/movement");

    const params = new URLSearchParams(window.location.search);
    const wodDate = params.get("wodDate");

    if (wodDate) setWod({ ...wod!, date: wodDate });
  }, []);

  return (
    <div className="h-screen mx-4 my-6">
      <div className="flex flex-row justify-between items-center w-full">
        <PageTitle title="New workout" />
        <Button
          onClick={onSave}
          disabled={loading || !wod.trainingBlocks.length}
        >
          {loading ? <LoadingSpinner /> : "Save"}
        </Button>
      </div>

      {error && (
        <span className="w-full inline-block my-4 px-16 text-base/4 text-center text-secondary font-semibold">
          Failed to save wod, please try again later
        </span>
      )}

      <div className="flex flex-col mt-4">
        <h2>Training blocks</h2>
        {wod?.trainingBlocks.map((t, index) => (
          <div
            key={`${t.type}-${index}`}
            className="min-h-28 w-full p-4 flex flex-col border border-gray-200 rounded-xl mt-2"
          >
            <div className="flex flex-row justify-between items-start w-full mb-2">
              <span className="font-bold">{trainingBlockLabels[t.type]}</span>
              <span>Time: {t.time} min</span>
              <span>Rounds: {t.rounds}</span>
              <IconButton onClick={() => removeTrainingBlock(index)}>
                <HiOutlineTrash size="20px" />
              </IconButton>
            </div>

            {t.movements.map((m) => (
              <span className="text-sm text-gray-500">
                {m.name === "Run"
                  ? `${m.distance}m run`
                  : `${m.reps} x ${m.name}`}
              </span>
            ))}
          </div>
        ))}
      </div>

      <Link
        href="/formTrainingBlock"
        className="h-36 w-full flex items-center justify-center bg-gray-200 rounded-xl mt-2"
      >
        <HiOutlinePlus size="24px" color="#99a1af" />
      </Link>
    </div>
  );
}
