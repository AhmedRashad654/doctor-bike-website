"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <div>
      <div>
        <div onClick={() => setTheme("light")}>Light</div>
        <div onClick={() => setTheme("dark")}>Dark</div>
      </div>
    </div>
  );
}
