"use client";

import { useMonthlyWods } from "@/app/context/MonthlyWodsContext";
import { useWod } from "@/app/context/WodContext";
import IconButton from "@/components/ui/iconButton";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

interface CalendarProps {
  wods: string;
}

export default function Calendar({ wods }: CalendarProps) {
  const [actualDate, setActualDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);

  const touchStartX = useRef<number | null>(null);

  const { monthlyWods, filterMonthlyWods } = useMonthlyWods();
  const { setInitialState } = useWod();
  
  useEffect(() => {
    renderCalendar();
    filterMonthlyWods(JSON.parse(wods), actualDate);
    setInitialState();
  }, [actualDate]);

  const renderCalendar = () => {
    const monthDates: Date[] = [];
    const currentMonth = actualDate.getUTCMonth();

    let currentDate = new Date(
      actualDate.getFullYear(),
      actualDate.getUTCMonth(),
      1
    );

    while (currentDate.getUTCMonth() === currentMonth) {
      monthDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getUTCDate() + 1);
    }

    setDates(monthDates);
  };

  const hasWod = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return monthlyWods.some((wod) => wod.date.startsWith(formattedDate));
  };

  const handleMonth = (act: "previous" | "next") => {
    const indexMonth = actualDate.getMonth();
    const actualYear = actualDate.getFullYear();
    const currentDay = actualDate.getDate();

    if (act === "next") {
      return setActualDate(new Date(actualYear, indexMonth + 1, currentDay));
    }

    return setActualDate(new Date(actualYear, indexMonth - 1, currentDay));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 60) handleMonth("previous");
    else if (
      deltaX < -60 &&
      actualDate.toLocaleDateString() < new Date().toLocaleDateString()
    )
      handleMonth("next");

    touchStartX.current = null;
  };

  return (
    <div
      className="flex flex-col border-b border-gray-300 my-6 pb-6 items-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-row w-full mb-3 items-center justify-between">
        <IconButton className="ml-4" onClick={() => handleMonth("previous")}>
          <HiArrowNarrowLeft size="20px" />
        </IconButton>

        <span className="font-bold absolute left-1/2 -translate-x-1/2">
          {actualDate.toLocaleDateString("en-US", { month: "long" })}{" "}
          {actualDate.getFullYear()}
        </span>

        {actualDate.toLocaleDateString() < new Date().toLocaleDateString() && (
          <IconButton className="mr-4" onClick={() => handleMonth("next")}>
            <HiArrowNarrowRight size="20px" />
          </IconButton>
        )}
      </div>

      <div className="grid grid-cols-7 w-full gap-1 text-center">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>

        {dates.length > 0 && (
          <>
            {Array(dates[0].getUTCDay())
              .fill(null)
              .map((_, idx) => (
                <span key={`empty-${idx}`} />
              ))}

            {dates.map((date) => (
              <Link
                key={date.toISOString()}
                href={`/wodPage?wodDate=${date.toISOString()}`}
                className={`h-8 w-8 rounded-full flex items-center justify-center justify-self-center ${
                  hasWod(date) ? "bg-primary text-white" : "text-gray-400"
                }`}
              >
                <span>{date.getUTCDate()}</span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
