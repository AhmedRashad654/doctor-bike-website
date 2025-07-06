"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations("home.navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (lang: string) => {
    const queryString = searchParams.toString();
    const newPath = `/${lang}${pathname.replace(/^\/[a-z]{2}/, "")}${
      queryString ? `?${queryString}` : ""
    }`;

    router.push(newPath);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          onCheckedChange={() => handleChange("en")}
        >
          {t("english")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "ar"}
          onCheckedChange={() => handleChange("ar")}
        >
          {t("arabic")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "he"}
          onCheckedChange={() => handleChange("he")}
        >
          {t("hebrew")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
