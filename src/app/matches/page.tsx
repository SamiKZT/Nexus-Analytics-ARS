import { Card, Text } from "@heroui/react";

import MatchesList from "@/components/MatchesList";
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
        <Text.Heading>Matches</Text.Heading>
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
      <Text.Heading className="text-6xl font-bold">Matches</Text.Heading>

      <MatchesList initialMatches={matches} />
    </main>
  );
}