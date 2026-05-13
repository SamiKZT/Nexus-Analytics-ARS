import Link from "next/link";
import { Card, Text, Button, cn } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { MatchCard } from "@/components/MatchCard";
import { MatchStatsTable } from "@/components/MatchStatsTable";
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
    [match, stats] = await Promise.all([getMatchById(id), getPlayerMatchStats(id)]);

    if (!match) {
      errorMessage = "Match introuvable.";
    }
  } catch {
    errorMessage = "Impossible de charger les détails du match.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Match" />
        <Card>
          <Card.Content className="py-6">
            <Text className="text-danger">{errorMessage}</Text>
          </Card.Content>
        </Card>
      </main>
    );
  }

  const matchData = match as Match;

  return (
    <main className="mt-20 mb-20 flex w-full flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4">
        <Link href="/matches">
          <Button variant="tertiary" size="lg">
            <span className="mr-2 inline-flex items-center">
              <ArrowLeft size={16} />
            </span>
            Retour
          </Button>
        </Link>
        <SectionTitle title="Match" />
      </div>

      <MatchCard
        match={matchData}
        hideCTA
        className={cn("bg-linear-to-r from-accent/20 via-background to-danger/20")}
      />

      <section className="flex flex-col gap-4">
        <SectionTitle title="Player Match Stats" />

        {stats.length > 0 ? (
          <MatchStatsTable statsData={stats} />
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
