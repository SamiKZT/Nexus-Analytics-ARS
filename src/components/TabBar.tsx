"use client";

import { Button } from "@heroui/react";
import { Home, Trophy, Users, Star, Activity } from "lucide-react";
import { Card } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

const TAB_CONFIG = [
  {
    id: "home",
    href: "/",
    label: "Accueil",
    icon: Home,
  },
  {
    id: "matches",
    href: "/matches",
    label: "Matches",
    icon: Activity,
  },
  {
    id: "tournaments",
    href: "/tournaments",
    label: "Tournois",
    icon: Trophy,
  },
  {
    id: "teams",
    href: "/teams",
    label: "Équipes",
    icon: Users,
  },
  {
    id: "champions",
    href: "/champions",
    label: "Champions",
    icon: Star,
  },
];

export function TabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-5">
      <Card className="flex-row items-center gap-1 px-3 py-2 rounded-full bg-surface-tertiary/60 backdrop-blur-sm">
        {TAB_CONFIG.map(({ id, href, label, icon: Icon }) => (
          <Button
            key={id}
            isIconOnly={false}
            variant={isActive(href) ? "primary" : "ghost"}
            size="lg"
            className="flex flex-col items-center justify-center gap-0.5 h-14 min-w-14"
            onPress={() => router.push(href)}
          >
            <Icon size={22} strokeWidth={isActive(href) ? 2.5 : 1.75} />
            <span className="text-[10px] font-medium tracking-tight">
              {label}
            </span>
          </Button>
        ))}
      </Card>
    </div>
  );
}