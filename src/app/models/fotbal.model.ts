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
  player:     Player;
  statistics: Statistic[];
}
export interface Birth {
  date:    Date;
  place:   null;
  country: string;
}

export interface Statistic {
  team:        Team;
  league:      League;
  games:       Games;
  substitutes: Substitutes;
  shots:       Shots;
  goals:       Goals;
  passes:      Passes;
  tackles:     Tackles;
  duels:       Duels;
  dribbles:    Dribbles;
  fouls:       Fouls;
  cards:       Cards;
  penalty:     Penalty;
}

export interface Cards {
  yellow:    null;
  yellowred: null;
  red:       null;
}

export interface Dribbles {
  attempts: null;
  success:  null;
  past:     null;
}

export interface Duels {
  total: null;
  won:   null;
}

export interface Fouls {
  drawn:     null;
  committed: null;
}

export interface Games {
  appearences: null;
  lineups:     null;
  minutes:     null;
  number:      null;
  position:    string;
  rating:      null;
  captain:     boolean;
}

export interface Goals {
  total:    null;
  conceded: null;
  assists:  null;
  saves:    null;
}
export interface Passes {
  total:    null;
  key:      null;
  accuracy: null;
}

export interface Penalty {
  won:      null;
  commited: null;
  scored:   null;
  missed:   null;
  saved:    null;
}

export interface Shots {
  total: null;
  on:    null;
}

export interface Substitutes {
  in:    null;
  out:   null;
  bench: null;
}

export interface Tackles {
  total:         null;
  blocks:        null;
  interceptions: null;
}
export interface Player {
  id:          number;
  name:        string;
  firstname:   string;
  lastname:    string;
  age:         number;
  birth:       Birth;
  nationality: string;
  height:      null;
  weight:      null;
  injured:     boolean;
  photo:       string;
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
