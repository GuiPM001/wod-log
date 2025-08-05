import React, { InputHTMLAttributes } from "react";
import { INPUT_CLASSNAME } from "./constants";
import Label from "./label";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string | null;
}

export default function Input(props: InputProps) {
  return (
    <div className="w-full relative">
      {props.label && (
        <Label error={props.error} htmlFor={props.label}>
          {props.label}
        </Label>
      )}

      <input
        id={props.label}
        className={`
          ${INPUT_CLASSNAME} 
          ${props.error ? "border-red-600" : ""}
        `}
        {...props}
      />

      {props?.errorMessage && (
        <span className="text-red-600 text-sm">{props.errorMessage}</span>
      )}
    </div>
  );
}
