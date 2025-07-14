"use client";
import React from "react";
import IconButton from "./ui/iconButton";
import { useRouter } from "next/navigation";
import { HiChevronLeft } from "react-icons/hi";

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  const router = useRouter();
  return (
    <div className="flex flex-row min-w-4/5 gap-1 items-center">
      <IconButton onClick={() => router.back()}>
        <HiChevronLeft size="24px"/>
      </IconButton>
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
}
