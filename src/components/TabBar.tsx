"use client";

import { Button } from "@heroui/react";
import { Home, Trophy, Users, Star, Activity } from "lucide-react";
import { Card } from "@heroui/react";

export type Tab = "home" | "matches" | "tournaments" | "teams" | "champions";

interface TabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TAB_CONFIG = [
  {
    id: "home" as const,
    label: "Accueil",
    icon: Home,
  },
  {
    id: "matches" as const,
    label: "Matches",
    icon: Activity,
  },
  {
    id: "tournaments" as const,
    label: "Tournois",
    icon: Trophy,
  },
  {
    id: "teams" as const,
    label: "Équipes",
    icon: Users,
  },
  {
    id: "champions" as const,
    label: "Champions",
    icon: Star,
  },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-5">
      <Card className="flex-row items-center gap-1 px-3 py-2 rounded-full">
        {TAB_CONFIG.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            isIconOnly={false}
            variant={activeTab === id ? "primary" : "ghost"}
            size="lg"
            className="flex flex-col items-center justify-center gap-0.5 h-14 min-w-14"
            onPress={() => onTabChange(id)}
          >
            <Icon size={22} strokeWidth={activeTab === id ? 2.5 : 1.75} />
            <span className="text-[10px] font-medium tracking-tight">
              {label}
            </span>
          </Button>
        ))}
      </Card>
    </div>
  );
}