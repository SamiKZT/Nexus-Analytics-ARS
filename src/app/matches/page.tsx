import Link from "next/link";
import { Card, Text } from "@heroui/react";
import { Radio } from "lucide-react";

import { MatchCard } from "@/components/MatchCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getMatches, Match } from "@/lib/api";

export default async function MatchesPage() {
  let matches: Match[] = [];
  let errorMessage: string | null = null;

  try {
    matches = await getMatches();
  } catch {
    errorMessage = "Impossible de charger les matches.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Matches" icon={<Radio />} />
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
      <SectionTitle title="Matches" icon={<Radio />} />

      <p className="max-w-3xl text-sm text-foreground/70">
        Consultez les rencontres programmées, en cours et terminées.
      </p>

      {matches.length > 0 ? (
        <section className="grid gap-4">
          {matches.map((match) => (
            <Link key={match.id} href={`/matches/${match.id}`} className="block">
              <MatchCard match={match} />
            </Link>
          ))}
        </section>
      ) : (
        <Card>
          <Card.Content className="py-6">
            <Text>Aucun match trouvé.</Text>
          </Card.Content>
        </Card>
      )}
    </main>
  );
}