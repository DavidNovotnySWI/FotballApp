import {Component} from '@angular/core';
import {FotballApiService} from "../services/fotbal-api/fotbal-api.service";
import {Observable} from "rxjs";
import {Leagues} from "../models/fotbal.model";
import {ModalController} from "@ionic/angular";
import {SettingsPage} from "../pages/settings/settings.page";
import {LeaguesService} from "../services/leagues/leagues.service";
import {image} from "ionicons/icons";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

// Klasický zápis
  // nutné přepsat data pokaždé když data získám
  // je nutné kontrolovat existenci objektu a dalších zanořených objektů dodatečnýma podmínkama viz view
  /**
   * @deprecated Tento způsob není doporučován, lepší možnost je použít weather$ s kombinací s pipou async
   */
  data: any = {};

  // Pokročilejší zápis
  // využívá obserable pattern
  // datový typ se uvádí do <...> - generika
  fotbal$: Observable<Leagues>;
  fotbals$: Observable<Leagues>[] = [];
  constructor(
    // Vložím servisku pro Dependency Injection (má vlastní serviska)
    // private je doporučeno pro koncové třídy,
    //  pokud by se jednalo o abstraktní třídu, nebo třídu určenou k dědění použil bych public nebo protected
    private fotbalApiService: FotballApiService,
    private  modalCtrl: ModalController,
    private leaguesService: LeaguesService // přidání servisky pro získání nastavení league
  ) {

    this.initLeagues();
    // nastavým výstup funkce při načtení stránky (pozor, před načtením view)
    // zde se žádná data nezískávají!!! data se získají až ve view pomocí | async (pipy async)
    // až pipa async provede onen .subscribe(...), který získá data
    // zde se pouze předavají stejné datové typy getByGeo$(...): Observable<...> >>> this.weather$: Observable<any>
    this.fotbal$ = this.fotbalApiService.getLeague$(39,"England","Premier League")
  }

  /**
   * inicializace počasí
   * není nejefektivnější, jelikož vždy resetuji pole requestů, optimalizace by ale zabrala více řádků a logiky
   *
   * @private
   */
  private initLeagues() {
    // reset pole na prázdné
    this.fotbals$ = [];
    // získání všech places ze servisky (jsou vždy aktuální)
    this.leaguesService.leaguesSample.forEach(league => {
      // kontrola jestli se má zobrazovat na domovské obrazovce nebo ne
      if (league.homepage) {
        // push do resetovaného pole
        // vkládám Observable objekt (pattern)
        // na view pak používám | async stejně jako v případě získání jedné polohy
        // rozdíl je že to celé běží v cyklu, který je dynamický a reaguje na změny pole
        this.fotbals$.push(
          this.fotbalApiService.getLeague$(league.id,league.country,league.name)
        )
        // Lepší jednorádkový zápis
        // this.weathers$.push(this.weatherApiService.getByGeo$(place.latitude, place.longitude))
      }
    });
  }

  /**
   * Get manual data
   *
   * @deprecated Tento způsob není doporučován, lepší možnost je použít weather$ s kombinací s pipou async
   */
  fetchData() {
    // získám data za pomocí metody .subscribe(...)
    // používám servisku, které umožňuje přenášet logiku skrze Dependency Injection (DI)
    this.fotbalApiService.getLeague$(39,"England","Premier League").subscribe(data => {
      // data získaná z requestu předám to proměnné this.data abych je mohl vypsat ve view (nahradím původní objekt uložený v data)
      this.data = data;
      console.log(data);
    })
  }
  /**
   * Modal open
   */
  async openSettings() {

    // umožňuji vytvořit modalové okno (překryv)
    // component = libovolný komponent/stránka (stránka je to samé, jen využívá lazy loading pomocí modulu)
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });

    // prezentace modalu po dalším nastaení (spustí animaci a dlaší části modalu)
    await modal.present();

    // možnost získávání dat před zavřením (onWillDismiss) nebo po zavření (onDidDismiss)
    // daty je myšleno to co modal (SettingsPage) zaslal v dismiss metodě >> this.modalCtrl.dismiss({...})
    // doporučuje se využít spíše .then() místo await struktury
    // data jsou pro onWillDismiss i onDidDismiss stejná.
    modal.onWillDismiss().then(_ => {
      // Potom co je zavřen modal (před tím než se spustí animace)
      // je znovu volán init weather, který resetuje data a znovu vše nastavuje podle aktuálního stavu
      this.initLeagues();
    });

    // alternativní zápis
    // pozor na použití await, který ale nikdy nenastane, zbytečně se může plnit paměť zařízení a vše pak být pomalejší
    // .then() je v tomto případě výhodnější
    // await modal.onWillDismiss();
    // this.initWeather();
  }

  protected readonly innerHeight = innerHeight;
  protected readonly image = image;
}
