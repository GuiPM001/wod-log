import React, { SelectHTMLAttributes } from "react";
import { INPUT_CLASSNAME } from "./constants";
import Label from "./label";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export default function Select(props: SelectProps) {
  return (
    <div className="w-full">
      <Label htmlFor={props.label}>
        {props.label}
      </Label>

      <div className="relative">
        <select
          className={`appearance-none ${INPUT_CLASSNAME}`}
          {...props}
        >
          {props.options.map((o) => (
            <option key={o.value} value={o.value} className="dark:bg-dark-2">
              {o.label}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 -translate-y-1/2">
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity={0.8}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#9CA3AF"
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
}
