import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Toolbar } from "@/components/Toolbar";
import { TabBar } from "@/components/TabBar";

export const metadata: Metadata = {
  title: "Nexus-Analytics",
  description: "Dashboard analytics for matches, players, teams and champions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col px-10 bg-background">
        <Providers>
          <Toolbar title="Nexus-Analytics" />
          <main className="flex-1 pt-20 pb-24">
            {children}
          </main>
          <TabBar />
        </Providers>
      </body>
    </html>
  );
}
