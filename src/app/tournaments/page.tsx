import { Card, Text } from "@heroui/react";
import { Trophy } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { TournamentCard } from "@/components/TournamentCard";
import { getTournaments, Tournament } from "@/lib/api";

export default async function TournamentsPage() {
  let tournaments: Tournament[] = [];
  let errorMessage: string | null = null;

  try {
    tournaments = await getTournaments();
  } catch {
    errorMessage = "Impossible de charger les tournois.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Tournois" icon={<Trophy />} />
        <Card>
          <Card.Content className="py-6">
            <Text className="text-danger">{errorMessage}</Text>
          </Card.Content>
        </Card>
      </main>
    );
  }

  return (
    <main className="mt-20 mb-20 flex w-full flex-col gap-8">
      <SectionTitle title="Tournois" icon={<Trophy />} />

      <p className="max-w-3xl text-sm text-foreground/70">
        Suivez les tournois référencés dans la base et leur fenêtre de compétition.
      </p>

      {tournaments.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </section>
      ) : (
        <Card>
          <Card.Content className="py-6">
            <Text>Aucun tournoi trouvé.</Text>
          </Card.Content>
        </Card>
      )}
    </main>
  );
}