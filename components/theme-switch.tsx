"use client";

import { useTheme } from "next-themes";
import { Button } from "@nextui-org/button";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "🌞" : "🌙"}
    </Button>
  );
}
