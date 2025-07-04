"use client";
import { useRouter, usePathname } from "next/navigation";
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
  const t = useTranslations("home.navbar")
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (lang: string) => {
    const newPath = `/${lang}${pathname.replace(/^\/[a-z]{2}/, "")}`;
    router.push(newPath);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
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
