"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { Wod } from "@/core/types/Wod";

interface MonthlyWodsContextProps {
  monthlyWods: Wod[];
  filterMonthlyWods: (allWods: Wod[], actualDate: Date) => void;
}

const MonthlyWodsContext = createContext<MonthlyWodsContextProps>({
  monthlyWods: [],
  filterMonthlyWods: () => {},
});

export const MonthlyWodsProvider = ({ children }: { children: ReactNode }) => {
  const [monthlyWods, setMonthlyWods] = useState<Wod[]>([]);

  const isInCurrentMonth = (actualDate: Date, dateStr: string): boolean => {
    const date = new Date(dateStr);

    return (
      date.getFullYear() === actualDate.getFullYear() &&
      date.getMonth() === actualDate.getMonth()
    );
  };

  const filterMonthlyWods = (allWods: Wod[], actualDate: Date) => {
    const monthlyWods = allWods.filter((w) =>
      isInCurrentMonth(actualDate, w.date)
    );

    setMonthlyWods(monthlyWods);
  };

  return (
    <MonthlyWodsContext.Provider value={{ monthlyWods, filterMonthlyWods }}>
      {children}
    </MonthlyWodsContext.Provider>
  );
};

export const useMonthlyWods = () => {
  const context = useContext(MonthlyWodsContext);
  return context;
};
