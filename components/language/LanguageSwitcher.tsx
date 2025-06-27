"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (lang: string) => {
    const newPath = `/${lang}${pathname.replace(/^\/[a-z]{2}/, "")}`;
    router.push(newPath);
  };

  return (
    <div>
      <div>
        <h4 className="cursor-pointer" onClick={() => handleChange("en")}>
          english
        </h4>
        <h4 className="cursor-pointer" onClick={() => handleChange("ar")}>
          arabic
        </h4>
        <h4 className="cursor-pointer" onClick={() => handleChange("he")}>
          Abree
        </h4>
      </div>
    </div>
  );
}
