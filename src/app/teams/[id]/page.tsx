import Link from "next/link";
import { Card, Text, Button } from "@heroui/react";
import { ArrowLeft, Users } from "lucide-react";

import { PlayerCard } from "@/components/PlayerCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getTeamById, getTeamPlayers, Player, Team } from "@/lib/api";

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let team: Team | null = null;
  let roster: Player[] = [];
  let errorMessage: string | null = null;

  try {
    const { id } = await params;
    [team, roster] = await Promise.all([getTeamById(id), getTeamPlayers(id)]);

    if (!team) {
      errorMessage = "Equipe introuvable.";
    }
  } catch {
    errorMessage = "Impossible de charger les détails de l'équipe.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Team" icon={<Users />} />
        <Card>
          <Card.Content className="py-6">
            <Text className="text-danger">{errorMessage}</Text>
          </Card.Content>
        </Card>
      </main>
    );
  }

  const teamData = team as Team;
  const rosterData = roster;

  return (
    <main className="mt-20 mb-20 flex w-full flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle title="Team" icon={<Users />} />
        <Link href="/teams">
          <Button variant="ghost">
            <span className="mr-2 inline-flex items-center">
              <ArrowLeft size={16} />
            </span>
            Retour
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="flex flex-col gap-3 py-6">
          <Text.Heading level={2} className="font-semibold">
            {teamData.name}
          </Text.Heading>
          <Text className="text-sm text-foreground/60">{teamData.region}</Text>
          <Text className="text-sm text-foreground/70">
            Classement actuel : {teamData.current_rank ?? "non classé"}
          </Text>
          {teamData.logo_url && (
            <Text className="text-xs text-foreground/50">{teamData.logo_url}</Text>
          )}
        </Card.Content>
      </Card>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Roster" />

        {rosterData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rosterData.map((player) => (
              <Link key={player.id} href={`/players/${player.id}`} className="block">
                <PlayerCard player={player} />
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="py-6">
              <Text>Aucun joueur associé à cette équipe.</Text>
            </Card.Content>
          </Card>
        )}
      </section>
    </main>
  );
}