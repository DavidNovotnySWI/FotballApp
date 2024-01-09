import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Leagues} from "../../models/fotbal.model";

@Injectable({
  providedIn: 'root'
})
export class FotballApiService {

  constructor(
    // Vložím servisku pro Dependency Injection (pro komunikaci s API skrze HTTP protokol)
    // private je doporučeno pro koncové třídy,
    //  pokud by se jednalo o abstraktní třídu, nebo třídu určenou k dědění použil bych public nebo protected
    private http: HttpClient
  ) {
  }

  /**
   * Get weather by GEO
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
}
