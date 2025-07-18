import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "ghost";
  color?: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  const getColors = () => {
    if (props.color === "secondary")
      return "text-primary bg-secondary hover:bg-secondary-dark";

    return "text-primary bg-primary hover:bg-primary-dark";
  };

  const getVariant = () => {
    if (props.variant === "ghost") return "bg-transparent";

    return "text-white";
  };

  return (
    <button
      {...props}
      className={`flex flex-row justify-center items-center w-full rounded-lg py-1 px-2 text-center font-semibold transition hover:text-white cursor-pointer ${getColors()} ${getVariant()} disabled:bg-gray-200 disabled:cursor-default disabled:text-gray-400`}
    >
      {props.children}
    </button>
  );
}
