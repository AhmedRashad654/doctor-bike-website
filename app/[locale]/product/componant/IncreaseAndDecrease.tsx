"use client";
import React, { useState } from "react";

export default function IncreaseAndDecrease() {
  const [count, setCount] = useState<number>(0);
  const inCreaseCount = () => {
    setCount(() => count + 1);
  };
  const deCreaseCount = () => {
    if (count > 0) {
      setCount(() => count - 1);
    }
  };
  return (
    <div className="bg-gray-200 dark:bg-gray-600 rounded-full flex justify-between items-center px-2 w-[120px] py-1 gap-3">
      <span
        className="bg-white rounded-full text-black w-[20px] h-[20px] flex justify-center items-center cursor-pointer"
        onClick={inCreaseCount}
      >
        +
      </span>
      <span className="text-black">{count}</span>
      <span
        className="bg-white rounded-full text-black w-[20px] h-[20px] flex justify-center items-center cursor-pointer"
        onClick={deCreaseCount}
      >
        -
      </span>
    </div>
  );
}
