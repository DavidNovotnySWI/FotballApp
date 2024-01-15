//leagues

export interface Leagues {
  get: string;
  results: number;
    paging:     Paging;
  response: Response[];
}


export interface Paging {
    current: number;
    total:   number;
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
  place:   string;
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
  yellow:    number;
  yellowred: number;
  red:       number;
}

export interface Dribbles {
  attempts: number;
  success:  number;
  past:     number;
}

export interface Duels {
  total: number;
  won:   number;
}

export interface Fouls {
  drawn:     number;
  committed: number;
}

export interface Games {
  appearences: number;
  lineups:     number;
  minutes:     number;
  number:      number;
  position:    string;
  rating:      number;
  captain:     boolean;
}

export interface Goals {
  total:    number;
  conceded: number;
  assists:  number;
  saves:    number;
}
export interface Passes {
  total:    number;
  key:      number;
  accuracy: number;
}

export interface Penalty {
  won:      number;
  commited: number;
  scored:   number;
  missed:   number;
  saved:    number;
}

export interface Shots {
  total: number;
  on:    number;
}

export interface Substitutes {
  in:    number;
  out:   number;
  bench: number;
}

export interface Tackles {
  total:         number;
  blocks:        number;
  interceptions: number;
}
export interface Player {
  id:          number;
  name:        string;
  firstname:   string;
  lastname:    string;
  age:         number;
  birth:       Birth;
  nationality: string;
  height:      string;
  weight:      number;
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
