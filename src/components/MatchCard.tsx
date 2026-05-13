import { Card, Text } from "@heroui/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface MatchCardProps {
  match: {
    id: string;
    scheduled_at: string;
    score_team1: number;
    score_team2: number;
    status: string;
    team1?: {
      name: string;
      region: string;
      logo_url?: string | null;
    };
    team2?: {
      name: string;
      region: string;
      logo_url?: string | null;
    };
  };
}

export function MatchCard({ match }: MatchCardProps) {
  const scheduledDate = new Date(match.scheduled_at);
  const isScheduled = match.status === 'scheduled';
  const isLive = match.status === 'in_progress';
  const isCompleted = match.status === 'completed';

  return (
    <Card className="w-full">
      <Card.Content className="flex flex-col gap-3 py-4">
        <div className="flex justify-between items-center">
          <Text.Heading level={4} className="text-sm">
            {isScheduled && format(scheduledDate, 'PPpp', { locale: fr })}
            {isLive && <span className="text-red-500 font-bold">🔴 EN DIRECT</span>}
            {isCompleted && "Terminé"}
          </Text.Heading>
          <span className={`text-xs px-2 py-1 rounded ${
            isLive ? 'bg-red-500/20 text-red-500' :
            isCompleted ? 'bg-green-500/20 text-green-500' :
            'bg-blue-500/20 text-blue-500'
          }`}>
            {match.status}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 text-right">
            <Text className="font-semibold">{match.team1?.name}</Text>
            <Text className="text-xs text-foreground/60">{match.team1?.region}</Text>
          </div>

          <div className="text-center px-3">
            <Text.Heading level={3} className="font-bold">
              {match.score_team1} - {match.score_team2}
            </Text.Heading>
          </div>

          <div className="flex-1">
            <Text className="font-semibold">{match.team2?.name}</Text>
            <Text className="text-xs text-foreground/60">{match.team2?.region}</Text>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
