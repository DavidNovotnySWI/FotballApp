export interface Matches {
    get:        string;
    errors:     any[];
    results:    number;
    response:   Response[];
}

export interface Response {
    fixture: Fixture;
    league:  League;
    teams:   Goals;
    goals:   Goals;
    score:   Score;
}

export interface Fixture {
    id:        number;
    referee:   null | string;
    timezone:  Timezone;
    date:      Date;
    timestamp: number;
    periods:   Periods;
    venue:     Venue;
    status:    Status;
}

export interface Periods {
    first:  number | null;
    second: number | null;
}

export interface Status {
    long:    Long;
    short:   Short;
    elapsed: number | null;
}

export enum Long {
    MatchFinished = "Match Finished",
    NotStarted = "Not Started",
}

export enum Short {
    Ft = "FT",
    NS = "NS",
}

export enum Timezone {
    UTC = "UTC",
}

export interface Venue {
    id:   number;
    name: string;
    city: string;
}

export interface Goals {
    home: AwayClass;
    away: AwayClass;
}

export interface AwayClass {
    id:     number;
    name:   string;
    logo:   string;
    winner: boolean | null;
}

export interface League {
    id:      number;
    name:    Name;
    country: Country;
    logo:    string;
    flag:    string;
    season:  number;
    round:   string;
}

export enum Country {
    England = "England",
}

export enum Name {
    PremierLeague = "Premier League",
}

export interface Score {
    halftime:  Goals;
    fulltime:  Goals;
    extratime: Goals;
    penalty:   Goals;
}
