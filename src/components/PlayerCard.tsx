import { Card, Text } from "@heroui/react";
import { Users } from "lucide-react";

interface PlayerCardProps {
  player: {
    id: string;
    pseudonym: string;
    main_role: string;
    nationality: string;
    is_active: boolean;
    current_team?: {
      name: string;
      region: string;
      logo_url?: string | null;
      current_rank?: number | null;
    } | null;
  };
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="w-full">
      <Card.Content className="flex flex-col gap-3 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Text.Heading level={4} className="font-semibold">
              {player.pseudonym}
            </Text.Heading>
            <Text className="text-xs text-foreground/60">
              {player.nationality}
            </Text>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${
            player.is_active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          }`}>
            {player.is_active ? 'Actif' : 'Inactif'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-foreground/60" />
            <Text className="text-sm font-semibold">{player.main_role}</Text>
          </div>

          {player.current_team && (
            <div>
              <Text className="text-xs text-foreground/60">Équipe</Text>
              <Text className="text-sm">{player.current_team.name}</Text>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
