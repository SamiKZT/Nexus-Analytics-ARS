"use client";

import { useState } from "react";
import { cn } from "@heroui/styles";

import { Button, Card, Text } from "@heroui/react";
import { TabBar, Tab } from "@/components/TabBar";
import { Toolbar } from "@/components/Toolbar";
import { SectionTitle } from "@/components/SectionTitle";

import { Radio, User2, Trophy } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="mt-20 mb-20 flex flex-col items-center justify-start gap-20">
      <Toolbar title="Nexus-Analytics" onAddExpense={() => { }} onSettings={() => { }} />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

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

          <Button
            variant="primary"
            size="lg"
          >
            Explorer les Matchs
          </Button>
        </div>

        <div
          className={cn(
            "flex flex-col justify-start items-center gap-2",
            "flex-1 min-h-75",
          )}>
          <SectionTitle title="Direct & à venir" icon={<Radio />} />

          <Card className="w-full grow">
            <Card.Content>
              <Text>Match Card</Text>
            </Card.Content>
          </Card>
          <Card className="w-full grow">
            <Card.Content>
              <Text>Match Card</Text>
            </Card.Content>
          </Card>
        </div>
      </section>

      {/* Active Tournaments Section */}
      <section className={cn(
        "flex flex-col items-center justify-start gap-5",
        "w-full min-h-52",
      )}>
        <SectionTitle title="Tournois en cours" icon={<Trophy />} />

        <div className="flex gap-2 w-full">
          <Card className="w-full">
            <Card.Content>
              <Text>Tournoi Card</Text>
            </Card.Content>
          </Card>
          <Card className="w-full">
            <Card.Content>
              <Text>Tournoi Card</Text>
            </Card.Content>
          </Card>
          <Card className="w-full">
            <Card.Content>
              <Text>Tournoi Card</Text>
            </Card.Content>
          </Card>
        </div>
      </section>

      {/* Top Players of the Week Section */}
      <section className={cn(
        "flex flex-col items-center justify-start gap-5",
        "w-full min-h-52",
      )}>
        <SectionTitle title="Top players de la semaine" icon={<User2 />} />

        <div className="flex gap-2 w-full">
          <Card className="w-full">
            <Card.Content>
              <Text>Player Card</Text>
            </Card.Content>
          </Card>
          <Card className="w-full">
            <Card.Content>
              <Text>Player Card</Text>
            </Card.Content>
          </Card>
          <Card className="w-full">
            <Card.Content>
              <Text>Player Card</Text>
            </Card.Content>
          </Card>
          <Card className="w-full">
            <Card.Content>
              <Text>Player Card</Text>
            </Card.Content>
          </Card>
        </div>
      </section>
    </div>
  );
}
