"use client";

import { Button, Card } from "@heroui/react";
import { ThemeSwitch } from "./ThemeSwitch";
import { Plus } from "lucide-react";

interface ToolbarProps {
  title: string;
  onAddExpense: () => void;
  onSettings?: () => void;
}

export function Toolbar({
  title,
  onAddExpense,
  onSettings,
}: ToolbarProps) {

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-5">
      <Card className="flex-row items-center justify-between w-full max-w-2xl px-4 py-2 rounded-full">
        <h1 className="text-[17px] font-semibold text-[--color-label] truncate">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            onPress={onAddExpense}
            className="text-primary"
          >
            <Plus size={20} />
          </Button>
          {onSettings && (
            <ThemeSwitch />
          )}
        </div>
      </Card>
    </div>
  );
}