import { supabase } from './supabase';

export interface TeamSummary {
  id?: string;
  name: string;
  region: string;
  logo_url?: string | null;
  current_rank?: number | null;
}

export interface Champion {
  id: string;
  name: string;
  title?: string | null;
  role?: string | null;
  image_url?: string | null;
}

export interface Match {
  id: string;
  tournament_id: string;
  team1_id: string;
  team2_id: string;
  scheduled_at: string;
  status: string;
  score_team1: number;
  score_team2: number;
  winner_team_id: string | null;
  team1?: TeamSummary;
  team2?: TeamSummary;
}

export interface Tournament {
  id: string;
  name: string;
  category: string;
  format: string;
  start_date: string;
  end_date: string;
}

export interface Player {
  id: string;
  pseudonym: string;
  main_role: string;
  nationality: string;
  is_active: boolean;
  current_team_id: string | null;
  current_team?: TeamSummary | null;
}

export interface Team {
  id: string;
  name: string;
  region: string;
  current_rank: number | null;
  logo_url: string | null;
}

export interface PlayerCareerHistory {
  id?: string;
  player_id: string;
  team_id?: string | null;
  role?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  team?: TeamSummary | null;
}

export interface PlayerChampionMastery {
  id?: string;
  player_id: string;
  champion_id: string;
  mastery_level?: number | null;
  mastery_points?: number | null;
  champion?: Champion | null;
}

export type PlayerRole = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support';

export interface PlayerMatchStat {
  id?: string;
  player_id: string;
  match_id: string;
  champion_id?: string | null;
  role_played?: PlayerRole | null;
  kills?: number | null;
  deaths?: number | null;
  assists?: number | null;
  cs?: number | null;
  gold_earned?: number | null;
  damage_dealt?: number | null;
  is_mvp?: boolean | null;
  player?: Pick<Player, 'pseudonym'> | null;
  champion?: Pick<Champion, 'name'> | null;
  match?: Match | null;
}

type QueryManyResult<T> = {
  data: T[] | null;
  error: unknown | null;
};

type QueryOneResult<T> = {
  data: T | null;
  error: unknown | null;
};

function failQuery(context: string, error: unknown): never {
  console.error(`Error ${context}:`, error);
  throw error;
}

async function runManyQuery<T>(context: string, query: PromiseLike<QueryManyResult<T>>): Promise<T[]> {
  const { data, error } = await query;

  if (error) {
    failQuery(context, error);
  }

  return data ?? [];
}

async function runOneQuery<T>(context: string, query: PromiseLike<QueryOneResult<T>>): Promise<T | null> {
  const { data, error } = await query;

  if (error) {
    failQuery(context, error);
  }

  return data;
}

export async function getUpcomingMatches(limit: number = 10) {
  return runManyQuery<Match>(
    'fetching upcoming matches',
    supabase
      .from('matches')
      .select(`
        *,
        team1:team1_id(name, region, logo_url),
        team2:team2_id(name, region, logo_url)
      `)
      .eq('status', 'scheduled')
      .order('scheduled_at', { ascending: true })
      .limit(limit),
  );
}

export async function getMatches(limit: number = 50) {
  return runManyQuery<Match>(
    'fetching matches',
    supabase
      .from('matches')
      .select(`
        *,
        team1:team1_id(name, region, logo_url),
        team2:team2_id(name, region, logo_url)
      `)
      .order('scheduled_at', { ascending: false })
      .limit(limit),
  );
}

export async function getMatchById(matchId: string) {
  return runOneQuery<Match>(
    'fetching match details',
    supabase
      .from('matches')
      .select(`
        *,
        team1:team1_id(id, name, region, logo_url, current_rank),
        team2:team2_id(id, name, region, logo_url, current_rank)
      `)
      .eq('id', matchId)
      .single(),
  );
}

export async function getActiveTournaments(limit: number = 5) {
  const today = new Date().toISOString().split('T')[0];

  return runManyQuery<Tournament>(
    'fetching active tournaments',
    supabase
      .from('tournaments')
      .select('*')
      .lte('start_date', today)
      .gte('end_date', today)
      .limit(limit),
  );
}

export async function getTournaments(limit: number = 50) {
  return runManyQuery<Tournament>(
    'fetching tournaments',
    supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: false })
      .limit(limit),
  );
}

export async function getTopPlayers(limit: number = 5) {
  return runManyQuery<Player>(
    'fetching players',
    supabase
      .from('players')
      .select(`
        *,
        current_team:current_team_id(name, region, logo_url, current_rank)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit),
  );
}

export async function getPlayers(limit: number = 50) {
  return runManyQuery<Player>(
    'fetching player list',
    supabase
      .from('players')
      .select(`
        *,
        current_team:current_team_id(name, region, logo_url, current_rank)
      `)
      .order('pseudonym', { ascending: true })
      .limit(limit),
  );
}

export async function getPlayerById(playerId: string) {
  return runOneQuery<Player>(
    'fetching player details',
    supabase
      .from('players')
      .select(`
        *,
        current_team:current_team_id(name, region, logo_url, current_rank)
      `)
      .eq('id', playerId)
      .single(),
  );
}

export async function getChampions(limit: number = 100) {
  return runManyQuery<Champion>(
    'fetching champions',
    supabase
      .from('champions')
      .select('*')
      .order('name', { ascending: true })
      .limit(limit),
  );
}

export async function getTeams(limit: number = 100) {
  return runManyQuery<Team>(
    'fetching teams',
    supabase
      .from('teams')
      .select('*')
      .order('name', { ascending: true })
      .limit(limit),
  );
}

export async function getTeamById(teamId: string) {
  return runOneQuery<Team>(
    'fetching team details',
    supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single(),
  );
}

export async function getTeamPlayers(teamId: string) {
  return runManyQuery<Player>(
    'fetching team roster',
    supabase
      .from('players')
      .select(`
        *,
        current_team:current_team_id(name, region, logo_url, current_rank)
      `)
      .eq('current_team_id', teamId)
      .order('pseudonym', { ascending: true }),
  );
}

export async function getPlayerCareerHistory(playerId: string) {
  return runManyQuery<PlayerCareerHistory>(
    'fetching player career history',
    supabase
      .from('player_career_history')
      .select(`
        *,
        team:team_id(name, region, logo_url, current_rank)
      `)
      .eq('player_id', playerId),
  );
}

export async function getPlayerChampionMastery(playerId: string) {
  return runManyQuery<PlayerChampionMastery>(
    'fetching player champion mastery',
    supabase
      .from('player_champion_mastery')
      .select(`
        *,
        champion:champion_id(id, name, title, role, image_url)
      `)
      .eq('player_id', playerId),
  );
}

export async function getPlayerMatchStats(matchId: string) {
  return runManyQuery<PlayerMatchStat>(
    'fetching player stats',
    supabase
      .from('player_match_stats')
      .select(`
        *,
        player:player_id(pseudonym),
        champion:champion_id(name)
      `)
      .eq('match_id', matchId),
  );
}

export async function getPlayerMatchStatsForPlayer(playerId: string) {
  return runManyQuery<PlayerMatchStat>(
    'fetching player match stats',
    supabase
      .from('player_match_stats')
      .select(`
        *,
        player:player_id(pseudonym),
        champion:champion_id(name),
        match:match_id(
          id,
          scheduled_at,
          status,
          score_team1,
          score_team2,
          team1:team1_id(name, region, logo_url),
          team2:team2_id(name, region, logo_url)
        )
      `)
      .eq('player_id', playerId),
  );
}
