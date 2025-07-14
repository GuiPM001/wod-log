"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { TrainingBlock } from "@/core/types/TrainingBlock";
import { Wod } from "@/core/types/Wod";

interface WodContextProps {
  wod: Wod | null;
  addTrainingBlock: (trainingBlock: TrainingBlock) => void;
  removeTrainingBlock: (index: number) => void;
}

const WodContext = createContext<WodContextProps>({
  wod: null,
  addTrainingBlock: () => {},
  removeTrainingBlock: () => {},
});

export const WodProvider = ({ children }: { children: ReactNode }) => {
  const [wod, setWod] = useState<Wod>({ trainingBlocks: [] });

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

  return (
    <WodContext.Provider value={{ wod, addTrainingBlock, removeTrainingBlock }}>
      {children}
    </WodContext.Provider>
  );
};

export const useWod = () => {
  const context = useContext(WodContext);
  return context;
};
