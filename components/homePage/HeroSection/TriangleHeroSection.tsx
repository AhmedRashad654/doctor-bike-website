"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function TriangleHeroSection() {
  return (
    <div className="relative w-full h-[100px]">
      <div
        className={cn(
          "absolute bottom-0 left-0 w-[100vw] h-0 border-r-[100vw] border-b-[70px] md:border-b-[100px]",
          "border-r-transparent border-b-transperants dark:border-b-background"
        )}
      />
    </div>
  );
}
