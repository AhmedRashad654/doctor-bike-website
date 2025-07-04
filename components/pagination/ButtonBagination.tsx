"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useLocale } from "next-intl";

export default function ButtonPagination({
  meta,
}: {
  meta: {
    totalPages: number;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= meta.totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="mt-5 flex items-center gap-3">
      {/* Prev */}
      <div
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${currentPage > 1 ? "cursor-pointer" : "opacity-50"}`}
      >
        {locale === "ar" ? (
          <FaAngleRight size={25} color="gray" />
        ) : (
          <FaAngleLeft size={25} color="gray" />
        )}
      </div>

      {/* Pages */}
      <div className="flex gap-2 items-center">
        {meta.totalPages <= 3 ? (
          Array.from({ length: meta.totalPages }).map((_, i) => (
            <div
              key={i}
              className={`p-1 px-4 rounded-md font-bold cursor-pointer
              ${
                currentPage === i + 1
                  ? "bg-link-active dark:bg-card text-white"
                  : "bg-link-inactive dark:text-blue-600 text-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </div>
          ))
        ) : (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className={`p-1 px-4 rounded-md font-bold cursor-pointer
                ${
                  currentPage === i + 1
                    ? "bg-link-active dark:bg-card text-white"
                    : "bg-link-inactive dark:text-blue-600 text-white"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </div>
            ))}
            <div
              className={`p-1 px-4 rounded-md font-bold min-h-[30px] text-white
              ${
                currentPage > 2
                  ? "bg-link-active dark:bg-card"
                  : "bg-link-inactive dark:text-blue-600"
              }`}
            >
              {currentPage > 2 ? currentPage : "..."}
            </div>
          </>
        )}
      </div>

      {/* Next */}
      <div
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${
          meta.totalPages > currentPage ? "cursor-pointer" : "opacity-50"
        }`}
      >
        {locale === "ar" ? (
          <FaAngleLeft size={25} color="gray" />
        ) : (
          <FaAngleRight size={25} color="gray" />
        )}
      </div>
    </div>
  );
}
