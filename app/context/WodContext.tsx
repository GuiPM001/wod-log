"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { TrainingBlock } from "@/core/types/TrainingBlock";
import { Wod } from "@/core/types/Wod";

interface WodContextProps {
  wod: Wod;
  setWod: (wod: Wod) => void;
  setInitialState: () => void;
  addTrainingBlock: (trainingBlock: TrainingBlock) => void;
  removeTrainingBlock: (index: number) => void;
}

const initialState: Wod = {
  date: new Date().toISOString(),
  trainingBlocks: [],
};

const WodContext = createContext<WodContextProps>({
  wod: initialState,
  setWod: () => {},
  setInitialState: () => {},
  addTrainingBlock: () => {},
  removeTrainingBlock: () => {},
});

export const WodProvider = ({ children }: { children: ReactNode }) => {
  const [wod, setWod] = useState<Wod>(initialState);

  const addTrainingBlock = (trainingBlock: TrainingBlock) => {
    setWod({
      ...wod,
      trainingBlocks: [...wod.trainingBlocks, trainingBlock],
    });
  };

  const removeTrainingBlock = (index: number) => {
    const newArray = wod.trainingBlocks.filter((_, i) => i !== index);
    setWod({ ...wod, trainingBlocks: newArray });
  };

  const setInitialState = () => {
    setWod(initialState);
  };

  return (
    <WodContext.Provider
      value={{
        wod,
        setWod,
        setInitialState,
        addTrainingBlock,
        removeTrainingBlock,
      }}
    >
      {children}
    </WodContext.Provider>
  );
};

export const useWod = () => {
  const context = useContext(WodContext);
  return context;
};
