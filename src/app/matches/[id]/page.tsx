import Link from "next/link";
import { Card, Text, Button } from "@heroui/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Radio } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { getMatchById, getPlayerMatchStats, Match, PlayerMatchStat } from "@/lib/api";

export default async function MatchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let match: Match | null = null;
  let stats: PlayerMatchStat[] = [];
  let errorMessage: string | null = null;

  try {
    const { id } = await params;
    [match, stats] = await Promise.all([
      getMatchById(id),
      getPlayerMatchStats(id),
    ]);
    if (!match) {
      errorMessage = "Match introuvable.";
    }
  } catch {
    errorMessage = "Impossible de charger les détails du match.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Match" icon={<Radio />} />
        <Card>
          <Card.Content className="py-6">
            <Text className="text-danger">{errorMessage}</Text>
          </Card.Content>
        </Card>
      </main>
    );
  }

  const matchData = match as Match;
  const statsData = stats;
  const matchDate = new Date(matchData.scheduled_at);

  return (
    <main className="mt-20 mb-20 flex w-full flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle title="Match" icon={<Radio />} />
        <Link href="/matches">
          <Button variant="ghost">
            <span className="mr-2 inline-flex items-center">
              <ArrowLeft size={16} />
            </span>
            Retour
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="flex flex-col gap-4 py-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Text.Heading level={2} className="font-semibold">
                    {matchData.team1?.name ?? "Equipe 1"} vs {matchData.team2?.name ?? "Equipe 2"}
              </Text.Heading>
              <Text className="text-sm text-foreground/60">
                {format(matchDate, "PPpp", { locale: fr })}
              </Text>
            </div>

            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
              {matchData.status}
            </span>
          </div>

          <Text.Heading level={1} className="text-4xl font-black">
            {matchData.score_team1} - {matchData.score_team2}
          </Text.Heading>

          <div className="grid gap-3 md:grid-cols-2">
            <Card>
              <Card.Content className="py-4">
                <Text className="text-xs uppercase text-foreground/50">Equipe 1</Text>
                <Text className="text-lg font-semibold">{matchData.team1?.name}</Text>
                <Text className="text-sm text-foreground/60">{matchData.team1?.region}</Text>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="py-4">
                <Text className="text-xs uppercase text-foreground/50">Equipe 2</Text>
                <Text className="text-lg font-semibold">{matchData.team2?.name}</Text>
                <Text className="text-sm text-foreground/60">{matchData.team2?.region}</Text>
              </Card.Content>
            </Card>
          </div>
        </Card.Content>
      </Card>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Player Match Stats" />

        {statsData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {statsData.map((stat, index) => (
              <Card key={`${stat.player_id}-${stat.match_id}-${index}`}>
                <Card.Content className="flex flex-col gap-3 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Text.Heading level={4} className="font-semibold">
                        {stat.player?.pseudonym ?? "Joueur"}
                      </Text.Heading>
                      <Text className="text-sm text-foreground/60">
                        {stat.champion?.name ?? "Champion non renseigné"}
                      </Text>
                    </div>
                    <span className="rounded-full bg-default/80 px-2 py-1 text-xs">
                      {stat.kills ?? 0} / {stat.deaths ?? 0} / {stat.assists ?? 0}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-foreground/70">
                    <div>
                      <Text className="text-xs text-foreground/50">Gold</Text>
                      <Text>{stat.gold_earned ?? "-"}</Text>
                    </div>
                    <div>
                      <Text className="text-xs text-foreground/50">Damage</Text>
                      <Text>{stat.damage_dealt ?? "-"}</Text>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="py-6">
              <Text>Aucune statistique joueur pour ce match.</Text>
            </Card.Content>
          </Card>
        )}
      </section>
    </main>
  );
}