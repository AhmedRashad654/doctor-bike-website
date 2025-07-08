import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonSingleProduct() {
  return (
    <div className="flex flex-col items-center p-4 space-y-3 max-w-7xl mx-auto mt-10">
      <Skeleton className="h-[250px] w-full max-w-3xl rounded-xl" />
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-[60px] w-[60px]" />
        <Skeleton className="h-[60px] w-[60px]" />
        <Skeleton className="h-[60px] w-[60px]" />
        <Skeleton className="h-[60px] w-[60px]" />
      </div>
      <div className="flex gap-2 items-center justify-between flex-wrap w-full">
        <Skeleton className="h-[30px] w-[48%]" />
        <Skeleton className="h-[30px] w-[48%]" />
      </div>
      <div className="flex gap-2 items-center justify-between flex-wrap w-full">
        <Skeleton className="h-[30px] w-[48%]" />
        <Skeleton className="h-[30px] w-[48%]" />
      </div>
      <div className="flex gap-2 items-center justify-between flex-wrap w-full">
        <Skeleton className="h-[30px] w-[48%]" />
      </div>
      <div className="flex gap-2 items-center justify-between flex-wrap w-full">
        <Skeleton className="h-[30px] w-[48%]" />
        <Skeleton className="h-[30px] w-[48%]" />
      </div>
    </div>
  );
}
