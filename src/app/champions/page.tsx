import Link from "next/link";
import { Card, Text } from "@heroui/react";
import { Star } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { Champion, getChampions } from "@/lib/api";

export default async function ChampionsPage() {
  let champions: Champion[] = [];
  let errorMessage: string | null = null;

  try {
    champions = await getChampions();
  } catch {
    errorMessage = "Impossible de charger les champions.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Champions" icon={<Star />} />
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
      <SectionTitle title="Champions" icon={<Star />} />

      <p className="max-w-3xl text-sm text-foreground/70">
        Parcourez le catalogue des champions disponibles dans la base de données.
      </p>

      {champions.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {champions.map((champion) => (
            <Card key={champion.id} className="h-full">
              <Card.Content className="flex h-full flex-col gap-3 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Text.Heading level={3} className="font-semibold">
                      {champion.name}
                    </Text.Heading>
                    <Text className="text-sm text-foreground/60">
                      {champion.title || "Titre indisponible"}
                    </Text>
                  </div>

                  {champion.role && (
                    <span className="rounded-full bg-accent/15 px-2 py-1 text-xs font-medium text-accent">
                      {champion.role}
                    </span>
                  )}
                </div>

                {champion.image_url ? (
                  <Link
                    href={champion.image_url}
                    className="text-xs text-accent underline-offset-4 hover:underline"
                  >
                    Voir l&apos;image source
                  </Link>
                ) : (
                  <Text className="text-xs text-foreground/50">
                    Aucun lien média disponible
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <Card.Content className="py-6">
            <Text>Aucun champion trouvé.</Text>
          </Card.Content>
        </Card>
      )}
    </main>
  );
}