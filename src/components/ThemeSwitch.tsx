"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { SunMoon } from "lucide-react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunMoon size={20} />
            </Button>
  );
}
