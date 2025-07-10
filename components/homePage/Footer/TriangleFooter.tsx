import { cn } from "@/lib/utils";
import React from "react";

export default function TriangleFooter() {
  return (
    <div className="relative w-full h-[100px]">
      <div
        className={cn(
          "absolute top-0 left-0  w-[100vw] h-0 border-r-[100vw] border-t-[100px] z-50",
          "border-r-transparent border-t-transperants dark:border-t-background"
        )}
      />
    </div>
  );
}
