"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all  dark:-rotate-90" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all  dark:-rotate-90" />
      )}
    </Button>
  );
}
