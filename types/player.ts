export type SportType = 'football' | 'cricket';

export type FootballRole = 
  | 'Forward' 
  | 'Winger' 
  | 'Midfielder' 
  | 'Defensive Midfielder' 
  | 'Defender' 
  | 'Full Back' 
  | 'Goalkeeper';

export type CricketRole = 
  | 'Top-order Batter' 
  | 'Middle-order Batter' 
  | 'All-Rounder' 
  | 'Fast Bowler' 
  | 'Spin Bowler' 
  | 'Wicketkeeper-Batter';

export type PlayerRole = FootballRole | CricketRole;

export type PlayerTier = 'Legend' | 'World Class' | 'Elite' | 'Rising Star';

export interface PlayerStats {
  caps: number;
  primaryStatLabel: string;
  primaryStatValue: string | number;
  secondaryStatLabel: string;
  secondaryStatValue: string | number;
  tertiaryStatLabel: string;
  tertiaryStatValue: string | number;
  rating: number; // 0 - 99 scale
}

export interface Player {
  id: string;
  name: string;
  sport: SportType;
  nation: string;
  flag: string;
  role: PlayerRole;
  tier: PlayerTier;
  age: number;
  team: string; // Club or franchise
  jerseyNumber: number;
  marketValue: number; // e.g. 120000000 for $120M
  marketValueFormatted: string;
  image: string;
  bio: string;
  stats: PlayerStats;
  honors: string[];
}

export interface FilterState {
  sport: 'all' | SportType;
  role: string;
  nation: string;
  tier: string;
  searchQuery: string;
  sortBy: 'value-desc' | 'value-asc' | 'rating-desc' | 'age-asc' | 'name-asc';
  viewMode: 'grid' | 'table';
  listTab: 'all' | 'shortlist' | 'squad';
  maxPrice: number; // in dollars (0 means no limit)
  minRating: number; // 0 means no limit
}

export interface SquadSummary {
  players: Player[];
  totalValue: number;
  budgetLimit: number;
  footballCount: number;
  cricketCount: number;
  averageRating: number;
}
