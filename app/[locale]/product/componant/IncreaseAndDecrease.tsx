"use client";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function IncreaseAndDecrease({
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="bg-gray-200 dark:bg-gray-600 rounded-full flex justify-between items-center px-2 w-[120px] py-1 gap-3">
      <span
        className="bg-white rounded-full text-black w-[20px] h-[20px] flex justify-center items-center cursor-pointer"
        onClick={onIncrease}
      >
        +
      </span>
      <span className="text-black">{quantity}</span>
      <span
        className="bg-white rounded-full text-black w-[20px] h-[20px] flex justify-center items-center cursor-pointer"
        onClick={onDecrease}
      >
        -
      </span>
    </div>
  );
}
