import React from "react";
import { INPUT_CLASSNAME } from "./constants";
import { InputProps } from "./input";
import Label from "./label";

export default function inputTime(props: InputProps) {
  return (
    <div className="w-full">
      <Label error={props.error} htmlFor={props.label}>
        {props.label}
      </Label>

      <div className="flex items-center">
        <input
          id={props.label}
          className={`
                  ${INPUT_CLASSNAME} rounded-r-none
                  ${props.error ? "border-red-600" : ""}
                `}
          {...props}
        />
        <span className="h-[40px] py-2 px-3 rounded-tr-md rounded-br-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500">
          min
        </span>
      </div>
    </div>
  );
}
