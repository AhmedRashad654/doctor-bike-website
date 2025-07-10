import { cn } from "@/lib/utils";
import React from "react";

export default function TriangleAdvirtisements() {
  return (
    <div className="relative w-full h-[100px]">
      <div
        className={cn(
          "absolute top-0 left-0 w-[100vw] h-0 border-l-[100vw] border-t-[70px] md:border-t-[100px]",
          "border-l-transparent border-t-card"
        )}
      />
    </div>
  );
}
