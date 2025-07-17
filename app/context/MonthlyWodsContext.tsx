"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { Wod } from "@/core/types/Wod";

interface MonthlyWodsContextProps {
  wods: Wod[];
  setWods: (wods: Wod[]) => void;
  addWod: (wod: Wod) => void;
}

const MonthlyWodsContext = createContext<MonthlyWodsContextProps>({
  wods: [],
  setWods: () => {},
  addWod: () => {},
});

export const MonthlyWodsProvider = ({ children }: { children: ReactNode }) => {
  const [wods, setWods] = useState<Wod[]>([]);

  const addWod = (newWod: Wod) => {
    setWods([...wods, newWod]);
  };

  return (
    <MonthlyWodsContext.Provider value={{ wods, setWods, addWod }}>
      {children}
    </MonthlyWodsContext.Provider>
  );
};

export const useMonthlyWods = () => {
  const context = useContext(MonthlyWodsContext);
  return context;
};
