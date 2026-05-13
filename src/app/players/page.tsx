import Link from "next/link";
import { Card, Text } from "@heroui/react";
import { Users } from "lucide-react";

import { PlayerCard } from "@/components/PlayerCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getPlayers, Player } from "@/lib/api";

export default async function PlayersPage() {
  let players: Player[] = [];
  let errorMessage: string | null = null;

  try {
    players = await getPlayers();
  } catch {
    errorMessage = "Impossible de charger les joueurs.";
  }

  if (errorMessage) {
    return (
      <main className="mt-20 mb-20 flex w-full flex-col gap-8">
        <SectionTitle title="Players" icon={<Users />} />
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
      <SectionTitle title="Players" icon={<Users />} />

      <p className="max-w-3xl text-sm text-foreground/70">
        Explorez la liste complète des joueurs référencés.
      </p>

      {players.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {players.map((player) => (
            <Link key={player.id} href={`/players/${player.id}`} className="block">
              <PlayerCard player={player} />
            </Link>
          ))}
        </section>
      ) : (
        <Card>
          <Card.Content className="py-6">
            <Text>Aucun joueur trouvé.</Text>
          </Card.Content>
        </Card>
      )}
    </main>
  );
}