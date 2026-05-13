import { Card, Text } from "@heroui/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TournamentCardProps {
  tournament: {
    id: string;
    name: string;
    category: string;
    format: string;
    start_date: string;
    end_date: string;
  };
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const startDate = new Date(tournament.start_date);
  const endDate = new Date(tournament.end_date);

  return (
    <Card className="w-full">
      <Card.Content className="flex flex-col gap-3 py-4">
        <div className="flex justify-between items-start gap-2">
          <Text.Heading level={4} className="text-sm font-semibold flex-1">
            {tournament.name}
          </Text.Heading>
          <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-500 whitespace-nowrap">
            {tournament.category}
          </span>
        </div>

        <div className="space-y-2">
          <div>
            <Text className="text-xs text-foreground/60">Format</Text>
            <Text className="text-sm">{tournament.format}</Text>
          </div>

          <div>
            <Text className="text-xs text-foreground/60">Période</Text>
            <Text className="text-sm">
              {format(startDate, 'dd MMM', { locale: fr })} - {format(endDate, 'dd MMM yyyy', { locale: fr })}
            </Text>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
