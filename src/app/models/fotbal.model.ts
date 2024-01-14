//leagues

export interface Leagues {
  get: string;
  results: number;
  response: Response[];
}



export interface Response {
  league: League;
  country: Country;
  seasons: Season[];
  team: Team;
  venue: Venue;
}
export interface Team {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}
export interface Venue {
  id:       number
  name:     string
  address:  string
  city:     string
  capacity: number
  surface:  string
  image:    string
}
export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
  standings: Array<Standings[]>;
}
export interface Standings {
  rank: string;
  team:        Team;
  points  :   number;
  goalsDiff: number;
  group :      string;
  form  :      string;
  status   :   string;
  description : string;
  all    :     All;
  home   :     All;
  away    :    All;
}

export interface All {
  played: number;
  win  :  number;
  draw :  number;
  lose :  number;
  goals:  Goals;

}
export interface Goals {
  for:     number;
  against : number;
}
export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface Coverage {
  fixtures: Fixtures;
  standings: boolean;
  players: boolean;
  topScorers: boolean;
  topAssists: boolean;
  topCards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface Fixtures {
  events: boolean;
  lineups: boolean;
  statisticsFixtures: boolean;
  statisticsPlayers: boolean;
}
