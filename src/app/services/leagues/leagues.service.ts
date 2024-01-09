import {Injectable} from '@angular/core';

/**
 * Model place
 *
 * Měl by existovat ve složce models
 * Zde ale dává větší logiku, proto jej nechávám zde
 * Je zde vše více ucelenější
 */
export interface LeagueSample {
  id: number;
  name: string;
  country: string;
  homepage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  /**
   * Základní místa v aplikaci
   *
   * @private
   */
  private privateLeagues: LeagueSample[] = [
    {
      id: 39,
      name: "Premier League",
      country: "England",
      homepage: true,
    },
    {
      id: 40,
      name: "Championship",
      country: "England",
      homepage: true,
    },
    {
      id: 41,
      name: "League One",
      country: "England",
      homepage: true,
    },

  ];

  /**
   * Available places
   *
   * Setter pro získání míst
   * Uvnitř settrů je možné volat funkce třídy, například init atd...
   * Využití to má třeba pro user$ kdy se vrací observable pattern, ale init pro získání dat se zavolá až je potřeba
   * Následně pak všude kde je použito je vše plně dynamické skrze Observable pattern a vše lze propsat mezi N stránkami
   *
   * Zde je obyčejná implementace získání dat z proměnné
   */
  get leaguesSample() {
    return this.privateLeagues;
  }

  constructor() {
  }

  /**
   * Set home visibility
   *
   * Nastaví zobrazení na domovské obrazovce
   * Není setter, je funkce. Setter umí příjmout maximálně 1 attribut
   *
   *
   * @param index
   * @param active
   */
  setHome(index: number, active: boolean) {
    this.privateLeagues[index].homepage = active;
  }
}
