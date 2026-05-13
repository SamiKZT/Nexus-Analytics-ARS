import Link from "next/link";
import { Card, Text } from "@heroui/react";
import { Users } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { getTeams, Team } from "@/lib/api";

export default async function TeamsPage() {
  let teams: Team[] = [];
  let errorMessage: string | null = null;

  try {
    teams = await getTeams();
  } catch {
    errorMessage = "Impossible de charger les équipes.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Teams" icon={<Users />} />
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
      <SectionTitle title="Teams" icon={<Users />} />

      <p className="max-w-3xl text-sm text-foreground/70">
        Consultez les équipes et leurs classements actuels.
      </p>

      {teams.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <Link key={team.id} href={`/teams/${team.id}`} className="block">
              <Card className="h-full">
                <Card.Content className="flex h-full flex-col gap-3 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Text.Heading level={3} className="font-semibold">
                        {team.name}
                      </Text.Heading>
                      <Text className="text-sm text-foreground/60">
                        {team.region}
                      </Text>
                    </div>

                    {team.current_rank !== null && team.current_rank !== undefined && (
                      <span className="rounded-full bg-accent/15 px-2 py-1 text-xs font-medium text-accent">
                        #{team.current_rank}
                      </span>
                    )}
                  </div>

                  <Text className="text-sm text-foreground/70">
                    {team.logo_url || "Aucun logo référencé"}
                  </Text>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </section>
      ) : (
        <Card>
          <Card.Content className="py-6">
            <Text>Aucune équipe trouvée.</Text>
          </Card.Content>
        </Card>
      )}
    </main>
  );
}