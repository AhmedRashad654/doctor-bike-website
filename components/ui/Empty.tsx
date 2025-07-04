import Image, { StaticImageData } from "next/image";
import React from "react";

export default function Empty({
  emptyImage,
  text,
}: {
  emptyImage: StaticImageData;
  text: string;
}) {
  return (
    <div className="min-h-[95vh] pt-6 w-full flex flex-col gap-5 justify-center items-center">
      <h4 className="text-2xl font-bold">{text}</h4>
      <Image src={emptyImage} alt="empty" />
    </div>
  );
}
