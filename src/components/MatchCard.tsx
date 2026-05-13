import { Avatar, Button, Card, Chip, cn, Text } from "@heroui/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PlayCircle } from "lucide-react";

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

const avatars = [
  {
    id: 1,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
  },
  {
    id: 2,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
  },
  {
    id: 3,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
  },
  {
    id: 4,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
  },
  {
    id: 5,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
  },
];

export function MatchCard({ match }: MatchCardProps) {
  const scheduledDate = new Date(match.scheduled_at);
  const isScheduled = match.status === 'scheduled';
  const isLive = match.status === 'in_progress';
  const isCompleted = match.status === 'completed';
  // Use a deterministic hash of the match id to pick an avatar index.
  // Avoid impure calls like Math.random during render.
  function stableIndex(key: string, modulo: number) {
    let h = 5381;
    for (let i = 0; i < key.length; i++) {
      h = (h * 33) ^ key.charCodeAt(i);
    }
    return Math.abs(h) % modulo;
  }

  const avatarIndex = stableIndex(match.id ?? '', avatars.length);

  return (
    <Card className={cn(
      "w-full",
      "rounded-lg border-2 border-t-3 border-muted/30 border-t-accent",
      "bg-linear-to-b from-surface-secondary to-background"
    )}>
      <Card.Content className="flex flex-col gap-3 pb-4">
        <div className="flex justify-between items-center">
          <Text.Heading level={6}>
            {isScheduled && format(scheduledDate, 'PPpp', { locale: fr })}
            {isLive && <Chip className="text-red-500 font-bold">🔴 EN DIRECT</Chip>}
            {isCompleted && "Terminé"}
          </Text.Heading>
          <Chip className={`text-xs px-2 py-1 ${isLive ? 'bg-red-500/20 text-red-500 border border-red-500/40' :
              isCompleted ? 'bg-green-500/20 text-green-500 border border-green-500/40' :
                'bg-blue-500/20 text-blue-500 border border-blue-500/40'
            }`}>
            {match.status}
          </Chip>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-2 flex-1 text-center">
            <Avatar className="ring-2 ring-background size-24">
              <Avatar.Image alt={match.team1?.name} src={avatars[avatarIndex]?.image} />
              <Avatar.Fallback>
                {match.team1?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <Text.Heading level={3} className="font-bold">{match.team1?.name}</Text.Heading>
            <Text className="text-xs text-foreground/60">{match.team1?.region}</Text>
          </div>

          <div className="text-center px-3">
            <Text.Heading level={3} className="text-6xl font-black">
              {/* team with the highest score is in accent color */}
              <span className={cn(
                "text-6xl font-black p-3",
                match.score_team1 > match.score_team2 ? "text-accent" : "text-foreground"
              )}>
                {match.score_team1}
              </span>
              <span className="text-6xl font-black">-</span>
              <span className={cn(
                "text-6xl font-black p-3",
                match.score_team2 > match.score_team1 ? "text-accent" : "text-foreground"
              )}>
                {match.score_team2}
              </span>
            </Text.Heading>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 flex-1 text-center">
            <Avatar className="ring-2 ring-background size-24">
              <Avatar.Image alt={match.team2?.name} src={avatars[(avatarIndex + 1) % avatars.length]?.image} />
              <Avatar.Fallback>
                {match.team2?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <Text.Heading level={3} className="font-bold">{match.team2?.name}</Text.Heading>
            <Text className="text-xs text-foreground/60">{match.team2?.region}</Text>
          </div>
        </div>
      </Card.Content>

      <Card.Footer className="justify-center items-center pt-5 border-t border-t-muted/20">
        <Button variant="tertiary">
          <PlayCircle />
          VOD
        </Button>
      </Card.Footer>
    </Card>
  );
}
