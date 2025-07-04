"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function TriangleCategory() {
  return (
    <div className="relative w-full h-[100px]">
      <div
        className={cn(
          "absolute bottom-0 left-0 w-[100vw] h-0 border-l-[100vw] border-b-[70px] md:border-b-[100px]",
          "border-l-transparent border-b-card"
        )}
      />
    </div>
  );
}
