import React from "react";

export default function Calendar() {
  const actualDate = new Date();
  const dates: Date[] = [];
  const currentMonth = actualDate.getUTCMonth();

  let currentDate = new Date(
    actualDate.getFullYear(),
    actualDate.getUTCMonth(),
    1
  );
  while (currentDate.getUTCMonth() === currentMonth) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getUTCDate() + 1);
  }

  return (
    <div className="flex flex-col">
      <span className="text-center mb-3">
        {actualDate.toLocaleDateString("en-US", { month: "long" })}{" "}
        {actualDate.getFullYear()}
      </span>

      <div className="grid grid-cols-7 gap-2 w-full text-center">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>

        {dates.length && (
          <>
            {Array(dates[0].getUTCDay())
              .fill(null)
              .map((_, idx) => (
                <span key={`empty-${idx}`} />
              ))}

            {dates.map((date) => (
              <span key={date.toISOString()} className="text-gray-400">
                {date.getUTCDate()}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
