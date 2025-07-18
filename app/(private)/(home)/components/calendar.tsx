"use client";

import { useMonthlyWods } from "@/app/context/MonthlyWodsContext";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { api } from "@/core/services/api";
import { ErrorResponse } from "@/core/types/ErrorResponse";
import { Wod } from "@/core/types/Wod";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Calendar() {
  const actualDate = new Date();

  const [dates, setDates] = useState<Date[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { wods, setWods } = useMonthlyWods();

  useEffect(() => {
    fetchWods();
  }, []);

  const fetchWods = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: Wod[] = await api.get(`/wod`, {
        params: { date: actualDate.toISOString() },
      });
      setWods(response);

      renderCalendar();
      setLoading(false);
    } catch (e: unknown) {
      setError(e as ErrorResponse);
      setLoading(false);
    }
  };

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

  const isWodDay = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return wods.some((wod) => wod.date.startsWith(formattedDate));
  };

  return (
    <div className="flex flex-col border-b border-gray-300 my-6 pb-6 items-center">
      <span className="text-center mb-3 font-bold">
        {actualDate.toLocaleDateString("en-US", { month: "long" })}{" "}
        {actualDate.getFullYear()}
      </span>

      {loading ? (
        <LoadingSpinner />
      ) : (
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
                    isWodDay(date) ? "bg-primary text-white" : "text-gray-400"
                  }`}
                >
                  <span>{date.getUTCDate()}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      )}

      {error && (
        <span className="w-full my-4 px-16 text-base/4 text-center text-secondary font-semibold">
          Failed to get training history, please try again later
        </span>
      )}
    </div>
  );
}
