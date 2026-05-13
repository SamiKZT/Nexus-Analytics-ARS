"use client";

import { ProgressBar, Table, Text } from "@heroui/react";
import {
  Crosshair,
  HandHelping,
  Mountain,
  Radar,
  Trees,
  type LucideIcon,
} from "lucide-react";

import type { PlayerMatchStat } from "@/lib/api";

const ROLE_ICONS: Record<string, LucideIcon> = {
  top: Mountain,
  jungle: Trees,
  mid: Radar,
  adc: Crosshair,
  support: HandHelping,
};

export function MatchStatsTable({ statsData }: { statsData: PlayerMatchStat[] }) {
  const totalDamage = statsData.reduce((sum, stat) => sum + (stat.damage_dealt ?? 0), 0);

  return (
    <Table aria-label="Match player statistics" className="max-w-full">
      <Table.Content
        aria-label="Match player statistics"
        className="min-w-190 rounded-2xl border border-default-200 bg-default-50/40 backdrop-blur-sm"
      >
        <Table.Header className="sticky top-0 z-10 bg-default-50/90">
          <Table.Column className="w-[30%]" id="player" isRowHeader>
            PLAYER / CHAMP
          </Table.Column>
          <Table.Column className="w-[10%] text-center" id="role">
            ROLE
          </Table.Column>
          <Table.Column className="w-[10%] text-center" id="kda">
            K/D/A
          </Table.Column>
          <Table.Column className="w-[10%] text-center" id="cs">
            CS
          </Table.Column>
          <Table.Column className="w-[10%] text-center" id="deaths">
            DEATHS
          </Table.Column>
          <Table.Column className="w-[10%] text-center" id="assists">
            ASSISTS
          </Table.Column>
          <Table.Column className="w-[25%]" id="dmg-share">
            DMG SHARE
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Collection items={statsData}>
            {(stat) => {
              const damageShare =
                totalDamage > 0 ? Math.round(((stat.damage_dealt ?? 0) / totalDamage) * 100) : 0;

              return (
                <Table.Row key={`${stat.player_id}-${stat.match_id}`}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent/40 text-xs font-semibold text-foreground/70">
                        {stat.player?.pseudonym?.slice(0, 2).toUpperCase() ?? "?"}
                        {stat.is_mvp && (
                          <span className="absolute top-0 text-foreground">👑</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <Text className="text-base font-semibold text-foreground">
                          {stat.player?.pseudonym ?? "Joueur"}
                        </Text>
                        <Text className="text-sm text-foreground/60">
                          {stat.champion?.name ?? "Champion non renseigné"}
                        </Text>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-center">
                      {(() => {
                        const RoleIcon = ROLE_ICONS[(stat.role_played ?? "").toLowerCase()] ?? Radar;
                        return (
                        <div className="text-foreground/60 text-center flex flex-col items-center gap-1">
                          <RoleIcon size={24} />
                          <span className="font-semibold">{stat.role_played}</span>
                        </div>
                      );
                      })()}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Text className="text-lg text-center font-semibold text-accent-light">
                      {stat.kills ?? 0} / {stat.deaths ?? 0} / {stat.assists ?? 0}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text className="text-center font-medium">
                      {stat.cs ?? 0}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text className="text-center font-medium">
                      {stat.deaths ?? 0}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text className="text-center font-medium">
                      {stat.assists ?? 0}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <ProgressBar
                        aria-label="Damage share"
                        className={"w-full max-w-52"}
                        value={damageShare}
                        size="lg"
                      >
                        <ProgressBar.Output />
                        <ProgressBar.Track>
                          <ProgressBar.Fill className="bg-linear-to-r from-[#cbb7ff] via-[#b19dff] to-[#f0dbff]" />
                        </ProgressBar.Track>
                      </ProgressBar>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Collection>
        </Table.Body>
      </Table.Content>
    </Table>
  );
}
