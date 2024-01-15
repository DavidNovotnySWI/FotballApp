import {Injectable} from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {ReplaySubject} from "rxjs";
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
  // Přidejte metodu pro přidání nové ligy
    addLeague(newLeague: LeagueSample) {
      this.privateLeagues.push(newLeague);
     // this.privateLeaguesSubject.next(this.privateLeagues);

      // Uložení nových dat do Local Storage
      Preferences.set({
        key: 'leagues',
        value: JSON.stringify(this.privateLeagues),
      });
    }
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
  private get leaguesSample() {
    return this.privateLeagues;
  }
  /**
   * Vlastní inicializace možného observable patternu
   *
   * Subject - je jich nekolik, implementaci volím, dle potřeby, viz oficiální dokumentace
   * @private
   */
  private privateLeaguesSubject = new ReplaySubject<LeagueSample[]>(1)

  /**
   * Drží náš vlastní observable Pattern - proměnnou
   */
  get leaguesSample$() {
    return this.privateLeaguesSubject.asObservable();
  }
  constructor() {
    // zísání dat z localstorage
    // await zde nejde, constructor musí být vždy synchronní proto je zde then
    Preferences.get({key: 'leagues'}).then(data => {
      // pokud data nejsou (třeba aplikace bězí poprvé, musíme rozhodnout)
      if (data.value) {
        // data mám, přeložím zpět ze stringu do pole
        const leagues = JSON.parse(data.value)
        // nastavení nových dat pro všechny odběratele (observable pattern)
        this.privateLeaguesSubject.next(leagues as LeagueSample[])
      } else {
        // data nejsou, vložím výchozí data
        // nastavení nových dat pro všechny odběratele (observable pattern)
        this.privateLeaguesSubject.next(this.leaguesSample)
      }
    });
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
  async setHome(index: number, active: boolean) {
    this.privateLeagues[index].homepage = active;
    this.privateLeaguesSubject.next(this.privateLeagues);
    // uložení dat do localstorage (využívá vestavěný adapter pattern pro jednotlivé platformy)
    await Preferences.set({
      key: 'leagues',
      value: JSON.stringify(this.privateLeagues),
    });
  }
}
