import React, { useEffect, useState } from "react";
import { Movement } from "@/core/types/Movement";
import { api } from "@/core/services/api";
import MovementItem from "@/components/movementItem";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { ErrorResponse } from "@/core/types/ErrorResponse";
import { setCachedMovements } from "@/core/cache/movementsCache";

interface MovementListProps {
  closeList: () => void;
  addMovement: (movement: Movement) => void;
}

export default function MovementList({
  closeList,
  addMovement,
}: MovementListProps) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Movement>({
    name: "",
    youtubeId: "",
    type: "Other",
  });

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    const movs: Movement[] = await api.get("/movement");
    setMovements(movs);
  };

  const closeModal = () => {
    setForm({ ...form, name: "" });
    setModalOpen(false);
  };

  const openModal = () => {
    setError(null);
    setModalOpen(true);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm({ ...form, name: e.target.value });
  };

  const saveMovement = async () => {
    try {
      if (!validMovement()) return;

      await api.post("/movement", form);
      addMovement(form);
      
      const updatedMovements = [...movements, form];
      
      setMovements(updatedMovements);
      setCachedMovements(updatedMovements);

      setModalOpen(false);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      setError(error.message);
    }
  };

  const validMovement = () => {
    const existingMovement = movements.find(
      (m) => m.name.toLocaleLowerCase() === form.name.toLocaleLowerCase()
    );

    if (existingMovement) {
      setError("Movement already exists");
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center mb-6">
        <button
          onClick={closeList}
          className="text-primary absolute left-3 cursor-pointer"
        >
          Cancel
        </button>
        <span className="font-semibold">Select a movement</span>
        <button
          onClick={openModal}
          className="text-primary absolute right-3 cursor-pointer"
        >
          Add custom
        </button>
      </div>

      {movements.map((m) => (
        <button
          onClick={() => addMovement(m)}
          className="border-b border-gray-200 py-6 cursor-pointer"
          key={m.youtubeId}
        >
          <MovementItem movement={m} />
        </button>
      ))}

      {modalOpen && (
        <div className="fixed top-0 right-0 h-screen w-screen bg-black/60 z-10 flex justify-center items-center">
          <div className="bg-white w-4/5 rounded-lg flex flex-col p-6 items-center gap-6">
            <h1 className="text-primary font-semibold">
              Add a custom movement
            </h1>

            <Input
              label="Name"
              onChange={handleName}
              value={form.name}
              error={!!error}
              errorMessage={error}
            />
            <Input label="Type" value={form.type} disabled />

            <div className="flex flex-row w-full mt-4">
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={saveMovement} disabled={!!error}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
