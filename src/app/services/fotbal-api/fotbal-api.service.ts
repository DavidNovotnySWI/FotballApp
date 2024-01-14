import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Leagues, League} from "../../models/fotbal.model";
import {list} from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class FotballApiService {
  detail?: Leagues;
  detailLeague?: Leagues;
  detailTeam?:Leagues;
  detailTeamId?:number;
  detailTeamLeagueId?:number;


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
  getLeague$(id: number, country: string, name:string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-apisports-key', environment.apiToken);
    headers = headers.set('x-rapidapi-host', environment.baseUrl);

    return this.http.get<Leagues>(`${environment.baseUrl}/leagues?id=${id}&country=${country}&name=${name}`, {headers: headers});
  }
  /**
   * Get league teams by information
   * @param leagueid number
   * @param season number

   */
  getTeamsInLeague$(leagueid: number,season: number) {
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

}
