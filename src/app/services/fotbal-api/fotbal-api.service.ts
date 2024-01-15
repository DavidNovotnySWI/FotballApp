import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Leagues, League} from "../../models/fotbal.model";
import {list} from "ionicons/icons";
import {Matches} from "../../models/fixtures";

@Injectable({
  providedIn: 'root'
})
export class FotballApiService {
  detail?: Leagues;
  detailLeague?: Leagues;
  detailTeam?:Leagues;
  detailTeamId?:number;
  detailTeamLeagueId?:number;
  players?:Leagues;


  constructor(
    // Vložím servisku pro Dependency Injection (pro komunikaci s API skrze HTTP protokol)
    // private je doporučeno pro koncové třídy,
    //  pokud by se jednalo o abstraktní třídu, nebo třídu určenou k dědění použil bych public nebo protected
    private http: HttpClient
  ) {
  }

  /**
   * Get league by information
   * @param id number
   * @param country string
   * @param name string

   */
  getLeague$(country: string, name:string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Leagues>(`${environment.baseUrl}/leagues?&country=${country}&name=${name}`, {headers: headers});
  }
  /**
   * Get league teams by information
   * @param leagueid number
   * @param season number

   */
  getMatchesInLeague$(leagueid: number,season: number) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Leagues>(`${environment.baseUrl}/teams?league=${leagueid}&season=${season}`, {headers: headers});

  }
  /**
   * Get league standings by information
   * @param leagueid number
   * @param season number

   */
  getStandingInLeague$(leagueid: number,season: number) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Leagues>(`${environment.baseUrl}/standings?league=${leagueid}&season=${season}`, {headers: headers});

  }

  getTeamInfo$(leagueid: number,season: number,teamid:number) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Leagues>(`${environment.baseUrl}/teams?id=${teamid}&league=${leagueid}&season=${season}`, {headers: headers});

  }

  getTeamPlayers$(teamid:number,leagueid: number,season: number, page:number) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Leagues>(`${environment.baseUrl}/players?team=${teamid}&league=${leagueid}&season=${season}&page=${page}`, {headers: headers});

  }

  getTeamMatches$(leagueid: number,season: number, teamid:number) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Matches>(`${environment.baseUrl}/fixtures?league=${leagueid}&season=${season}&team=${teamid}`, {headers: headers});

  }


  getLeagueMatches$(leagueId: number,season:number, dateFrom:string,dateTo:string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Matches>(`${environment.baseUrl}/fixtures?league=${leagueId}&season=${season}&from=${dateFrom}&to=${dateTo}`, {headers: headers});
  }
}
