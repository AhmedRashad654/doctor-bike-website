import { cn } from "@/lib/utils";
import React from "react";

export default function TriangleFooter() {
  return (
    <div className="relative w-full h-[100px]">
      <div
        className={cn(
          "absolute bottom-0 left-0 w-[100vw] h-0 border-l-[100vw] border-t-[100px] z-50",
          "border-l-transparent border-t-card"
        )}
      />
    </div>
  );
}
