"use client";

import React, { Dispatch, useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { request } from "@/axios/axios";
import {  useRouter, useSearchParams } from "next/navigation";
import { IProduct } from "@/types/product/IProduct";

export default function InputSearch({
  setOpenInputSearch,
}: {
  setOpenInputSearch?: Dispatch<boolean>;
}) {
  const t = useTranslations("home.navbar");
  const [options, setOptions] = useState<IProduct[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle Search API Call
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim() === "") {
        setOptions([]);
        return;
      }

      async function getProducts() {
        try {
          setLoading(true);

          const response = await request.post(
            `/Items/GetAllItemByName?Name=${searchValue}`,
            {
              paginationInfo: {
                pageIndex: 0,
                pageSize: 10,
              },
            }
          );

          setOptions(response?.data?.rows || []);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      getProducts();
    }, 300); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);
  // Handle Item Selection
  const handleSelect = (item: IProduct) => {
    const params = new URLSearchParams(searchParams.toString());
    if (item) {
      if (locale === "en") {
        params.set("name", item.nameEng);
      } else if (locale === "ar") {
        params.set("name", item.nameAr);
      } else {
        params.set("name", item.nameAbree);
      }
    } else {
      params.delete("name");
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
    setSearchValue("");
  };

  return (
    <Command className="relative bg-card dark:bg-[#232d43] py-0 overflow-visible border-none">
      <X
        className={cn(
          "absolute -top-2 right-2 w-4 h-4 lg:hidden cursor-pointer"
        )}
        onClick={() => setOpenInputSearch && setOpenInputSearch(false)}
      />
      <CommandInput
        placeholder={t("search")}
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        {!loading && options?.length > 0 && (
          <CommandGroup className="absolute top-10 left-0 bg-card max-h-[50vh] overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => handleSelect(option)}
              >
                {locale === "en"
                  ? option.nameEng?.slice(0, 30)
                  : locale === "ar"
                  ? option.nameAr?.slice(0, 30)
                  : option.nameAbree?.slice(0, 30)}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
