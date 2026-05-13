import { cn } from "@heroui/styles";
import { Text } from "@heroui/react";

export function SectionTitle({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className={cn(
      "flex items-baseline justify-between",
      "w-full py-2",
      "border-b border-muted",
    )}>
      <Text.Heading level={1}>{title}</Text.Heading>
      {icon && <div className="text-accent">{icon}</div>}
    </div>
  );
}
