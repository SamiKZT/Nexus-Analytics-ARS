"use client";

import { useState, useEffect } from "react";
import { cn } from "@heroui/styles";
import Link from "next/link";

import { Button, Card, Text } from "@heroui/react";
import { SectionTitle } from "@/components/SectionTitle";
import { MatchCard } from "@/components/MatchCard";
import { TournamentCard } from "@/components/TournamentCard";
import { PlayerCard } from "@/components/PlayerCard";

import { Radio, User2, Trophy } from "lucide-react";
import { getUpcomingMatches, getActiveTournaments, getTopPlayers, Match, Tournament, Player } from "@/lib/api";

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [matchesData, tournamentsData, playersData] = await Promise.all([
          getUpcomingMatches(2),
          getActiveTournaments(3),
          getTopPlayers(4),
        ]);

        setMatches(matchesData);
        setTournaments(tournamentsData);
        setPlayers(playersData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Erreur lors du chargement des données. Veuillez vérifier votre configuration Supabase.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-20 mb-20 flex flex-col items-center justify-start gap-20">
      {error && (
        <div className="w-full max-w-6xl px-4 py-3 bg-red-500/20 border border-red-500 rounded text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Hero Section */}
      <section className={cn(
        "flex items-start justify-start gap-5",
        "w-full h-full",
      )}>
        <div className={cn(
          "flex flex-col justify-center items-center gap-4",
          "flex-2 min-h-75",
          "bg-linear-to-tr from-[#0bc5e624] to-accent/10 from-10% to-40%",
          "border border-muted/50",
        )}>
          <div className="text-center">
            <Text.Heading level={1} className="font-black">Nexus-Analytics</Text.Heading>
            <Text.Heading level={2} className="text-foreground/60">Track. Predict. Dominate</Text.Heading>
          </div>

          <Link href="/matches">
            <Button variant="primary" size="lg">
              Explorer les Matchs
            </Button>
          </Link>
        </div>

        <div
          className={cn(
            "flex flex-col justify-start items-center gap-2",
            "flex-1 min-h-75",
          )}>
          <SectionTitle title="Direct & à venir" icon={<Radio />} />

          {isLoading ? (
            <Card className="w-full">
              <Card.Content>
                <Text>Chargement des matchs...</Text>
              </Card.Content>
            </Card>
          ) : matches.length > 0 ? (
            <>
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </>
          ) : (
            <Card className="w-full">
              <Card.Content>
                <Text>Aucun match à venir</Text>
              </Card.Content>
            </Card>
          )}
        </div>
      </section>

      {/* Active Tournaments Section */}
      <section className={cn(
        "flex flex-col items-center justify-start gap-5",
        "w-full min-h-52",
      )}>
        <SectionTitle title="Tournois en cours" icon={<Trophy />} />

        <div className="flex gap-2 w-full">
          {isLoading ? (
            <Card className="w-full">
              <Card.Content>
                <Text>Chargement des tournois...</Text>
              </Card.Content>
            </Card>
          ) : tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))
          ) : (
            <Card className="w-full">
              <Card.Content>
                <Text>Aucun tournoi en cours</Text>
              </Card.Content>
            </Card>
          )}
        </div>
      </section>

      {/* Top Players of the Week Section */}
      <section className={cn(
        "flex flex-col items-center justify-start gap-5",
        "w-full min-h-52",
      )}>
        <SectionTitle title="Top players de la semaine" icon={<User2 />} />

        <div className="flex gap-2 w-full">
          {isLoading ? (
            <Card className="w-full">
              <Card.Content>
                <Text>Chargement des joueurs...</Text>
              </Card.Content>
            </Card>
          ) : players.length > 0 ? (
            players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <Card className="w-full">
              <Card.Content>
                <Text>Aucun joueur trouvé</Text>
              </Card.Content>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
