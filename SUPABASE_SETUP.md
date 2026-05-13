# Supabase Setup Guide

## Overview
Your Next.js app is now connected to Supabase with components to display matches, tournaments, and players. Follow these steps to complete the setup.

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings > API**
4. Copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Step 2: Configure Environment Variables

Edit `.env.local` in the project root and add your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

## Step 3: Verify Database Schema

The app expects the following tables (all included in your schema):
- `champions`
- `draft_actions`
- `matches`
- `notifications`
- `player_career_history`
- `player_champion_mastery`
- `player_match_stats`
- `players`
- `predictions`
- `teams`
- `tournaments`
- `user_contacts`
- `user_follows_players`
- `user_follows_teams`
- `users`

Run your database migrations in Supabase SQL editor if needed.

## Step 4: Run the Development Server

```bash
yarn dev
```

Open http://localhost:3000 in your browser.

## File Structure

### Core Setup
- `lib/supabase.ts` - Supabase client initialization
- `lib/api.ts` - API functions for fetching data
- `.env.local` - Environment variables (⚠️ Never commit this file)

### Components
- `src/components/MatchCard.tsx` - Displays match information
- `src/components/TournamentCard.tsx` - Displays tournament information
- `src/components/PlayerCard.tsx` - Displays player information

### Pages
- `src/app/page.tsx` - Homepage with real data

## API Functions Available

### `getUpcomingMatches(limit: number = 10)`
Fetches scheduled matches with team information.

### `getActiveTournaments(limit: number = 5)`
Fetches tournaments currently in progress.

### `getTopPlayers(limit: number = 5)`
Fetches active players with team information.

### `getMatchWithTeams(matchId: string)`
Fetches specific match details with full team data.

### `getPlayerMatchStats(matchId: string)`
Fetches player statistics for a specific match.

## Troubleshooting

### Error: "Erreur lors du chargement des données"
1. Check `.env.local` is correctly configured
2. Verify Supabase URL and API key are valid
3. Open browser console (F12) to see detailed error messages

### No data appearing
1. Ensure your Supabase tables have data
2. Check that the database schema matches expectations
3. Verify network tab in browser DevTools shows successful requests

### Row Level Security (RLS) Issues
If queries fail, check RLS policies on your tables:
1. Go to Supabase Dashboard > SQL Editor
2. Disable RLS for public tables or configure proper policies:
   ```sql
   ALTER TABLE matches DISABLE ROW LEVEL SECURITY;
   ALTER TABLE tournaments DISABLE ROW LEVEL SECURITY;
   ALTER TABLE players DISABLE ROW LEVEL SECURITY;
   ALTER TABLE teams DISABLE ROW LEVEL SECURITY;
   ```

## Next Steps

- Customize card layouts in the component files
- Add more data fetching functions in `lib/api.ts`
- Implement real-time updates with Supabase subscriptions
- Add authentication with Supabase Auth
- Create detailed match/player/tournament pages
