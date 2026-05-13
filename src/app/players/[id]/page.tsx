import Link from "next/link";
import { Card, Text, Button } from "@heroui/react";
import { ArrowLeft, User2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { PlayerCard } from "@/components/PlayerCard";
import { SectionTitle } from "@/components/SectionTitle";
import {
  Player,
  PlayerCareerHistory,
  PlayerChampionMastery,
  PlayerMatchStat,
  getPlayerById,
  getPlayerCareerHistory,
  getPlayerChampionMastery,
  getPlayerMatchStatsForPlayer,
} from "@/lib/api";

export default async function PlayerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let player: Player | null = null;
  let careerHistory: PlayerCareerHistory[] = [];
  let mastery: PlayerChampionMastery[] = [];
  let matchStats: PlayerMatchStat[] = [];
  let errorMessage: string | null = null;

  try {
    const { id } = await params;
    [player, careerHistory, mastery, matchStats] = await Promise.all([
      getPlayerById(id),
      getPlayerCareerHistory(id),
      getPlayerChampionMastery(id),
      getPlayerMatchStatsForPlayer(id),
    ]);
    if (!player) {
      errorMessage = "Joueur introuvable.";
    }
  } catch {
    errorMessage = "Impossible de charger les détails du joueur.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Player" icon={<User2 />} />
        <Card>
          <Card.Content className="py-6">
            <Text className="text-danger">{errorMessage}</Text>
          </Card.Content>
        </Card>
      </main>
    );
  }

  const playerData = player as Player;
  const careerHistoryData = careerHistory;
  const masteryData = mastery;
  const matchStatsData = matchStats;

  return (
    <main className="mt-20 mb-20 flex w-full flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle title="Player" icon={<User2 />} />
        <Link href="/players">
          <Button variant="ghost">
            <span className="mr-2 inline-flex items-center">
              <ArrowLeft size={16} />
            </span>
            Retour
          </Button>
        </Link>
      </div>

      <PlayerCard player={playerData} />

      <section className="flex flex-col gap-4">
        <SectionTitle title="Career history" />

        {careerHistoryData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {careerHistoryData.map((entry, index) => (
              <Card key={`${entry.player_id}-${index}`}>
                <Card.Content className="flex flex-col gap-3 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Text.Heading level={4} className="font-semibold">
                        {entry.team?.name ?? "Equipe inconnue"}
                      </Text.Heading>
                      <Text className="text-sm text-foreground/60">
                        {entry.team?.region ?? "Region indisponible"}
                      </Text>
                    </div>
                    {entry.role && (
                      <span className="rounded-full bg-accent/15 px-2 py-1 text-xs text-accent">
                        {entry.role}
                      </span>
                    )}
                  </div>

                  <Text className="text-sm text-foreground/70">
                    {entry.start_date
                      ? format(new Date(entry.start_date), "PPP", { locale: fr })
                      : "Date de début inconnue"}
                    {entry.end_date ? ` - ${format(new Date(entry.end_date), "PPP", { locale: fr })}` : " - Aujourd'hui"}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="py-6">
              <Text>Aucune carrière enregistrée.</Text>
            </Card.Content>
          </Card>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Champion mastery" />

        {masteryData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {masteryData.map((entry, index) => (
              <Card key={`${entry.player_id}-${entry.champion_id}-${index}`}>
                <Card.Content className="flex flex-col gap-3 py-4">
                  <Text.Heading level={4} className="font-semibold">
                    {entry.champion?.name ?? "Champion inconnu"}
                  </Text.Heading>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <Text className="text-xs text-foreground/50">Niveau</Text>
                      <Text>{entry.mastery_level ?? "-"}</Text>
                    </div>
                    <div>
                      <Text className="text-xs text-foreground/50">Points</Text>
                      <Text>{entry.mastery_points ?? "-"}</Text>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="py-6">
              <Text>Aucune maîtrise de champion trouvée.</Text>
            </Card.Content>
          </Card>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Match stats" />

        {matchStatsData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matchStatsData.map((stat, index) => (
              <Card key={`${stat.player_id}-${stat.match_id}-${index}`}>
                <Card.Content className="flex flex-col gap-3 py-4">
                  <div>
                    <Text.Heading level={4} className="font-semibold">
                      {stat.champion?.name ?? "Champion inconnu"}
                    </Text.Heading>
                    <Text className="text-sm text-foreground/60">
                      {stat.match?.scheduled_at
                        ? format(new Date(stat.match.scheduled_at), "PPpp", { locale: fr })
                        : "Match sans date"}
                    </Text>
                  </div>

                  <div className="rounded-xl bg-default/40 p-3 text-sm">
                    <Text className="font-semibold">
                      {stat.match?.team1?.name ?? "Equipe 1"} vs {stat.match?.team2?.name ?? "Equipe 2"}
                    </Text>
                    <Text className="text-foreground/70">
                      Score: {stat.match?.score_team1 ?? 0} - {stat.match?.score_team2 ?? 0}
                    </Text>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm text-foreground/70">
                    <div>
                      <Text className="text-xs text-foreground/50">Kills</Text>
                      <Text>{stat.kills ?? "-"}</Text>
                    </div>
                    <div>
                      <Text className="text-xs text-foreground/50">Deaths</Text>
                      <Text>{stat.deaths ?? "-"}</Text>
                    </div>
                    <div>
                      <Text className="text-xs text-foreground/50">Assists</Text>
                      <Text>{stat.assists ?? "-"}</Text>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="py-6">
              <Text>Aucune statistique de match trouvée.</Text>
            </Card.Content>
          </Card>
        )}
      </section>
    </main>
  );
}