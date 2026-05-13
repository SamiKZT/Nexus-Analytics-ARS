"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, Dropdown } from "@heroui/react";
import { ChevronDown } from "lucide-react";

import { Match as MatchType } from "@/lib/api";
import { MatchCard } from "@/components/MatchCard";

type Filter = "all" | "live" | "scheduled" | "completed";
type Sort = "newest" | "oldest";

export default function MatchesList({ initialMatches }: { initialMatches: MatchType[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const filtered = useMemo(() => {
    let items = initialMatches ?? [];

    if (filter === "live") {
      items = items.filter((m) => m.status === "in_progress");
    } else if (filter === "scheduled") {
      items = items.filter((m) => m.status === "scheduled");
    } else if (filter === "completed") {
      items = items.filter((m) => m.status === "completed");
    }

    items = items.slice();
    items.sort((a, b) => {
      const ta = new Date(a.scheduled_at).getTime();
      const tb = new Date(b.scheduled_at).getTime();
      return sort === "newest" ? tb - ta : ta - tb;
    });

    return items;
  }, [initialMatches, filter, sort]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2 bg-surface-secondary/40 border border-muted/30 rounded-lg mb-4">
        <div className="flex gap-2 tracking-wider">
          <Button variant={filter === "all" ? "primary" : "outline"} onPress={() => setFilter("all")}>All</Button>
          <Button variant={filter === "live" ? "primary" : "outline"} onPress={() => setFilter("live")}>Live</Button>
          <Button variant={filter === "scheduled" ? "primary" : "outline"} onPress={() => setFilter("scheduled")}>Programmé</Button>
          <Button variant={filter === "completed" ? "primary" : "outline"} onPress={() => setFilter("completed")}>Terminé</Button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-foreground/60">Trier</label>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                {sort === "newest" ? "Plus récent" : "Plus ancien"}
                <ChevronDown size={16} />
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <div className="flex flex-col w-full p-2">
                <Button variant={sort === "newest" ? "primary" : "ghost"} size="sm" onPress={() => setSort("newest")}>Plus récent</Button>
                <Button variant={sort === "oldest" ? "primary" : "ghost"} size="sm" onPress={() => setSort("oldest")}>Plus ancien</Button>
              </div>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>

      {filtered.length > 0 ? (
        <section className="grid grid-cols-2 gap-4">
          {filtered.map((match) => (
            <Link key={match.id} href={`/matches/${match.id}`} className="block">
              <MatchCard match={match} />
            </Link>
          ))}
        </section>
      ) : (
        <Card>
          <Card.Content className="py-6">
            <div>Aucun match trouvé.</div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}
