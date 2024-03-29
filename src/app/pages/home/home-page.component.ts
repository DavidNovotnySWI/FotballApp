import {Component, OnInit} from '@angular/core';
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import {firstValueFrom, Observable} from "rxjs";
import {League, Leagues} from "../../models/fotbal.model";
import {ModalController} from "@ionic/angular";
import {SettingsPage} from "../settings/settings.page";
import {LeagueSample, LeaguesService} from "../../services/leagues/leagues.service";
import {LeagueDetailPage} from "../league-detail/league-detail.page";
import {image} from "ionicons/icons";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePage implements OnInit{
  leagueForm!: FormGroup;
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
  newLeagueName = '';
  newLeagueCountry = '';

  //pole s platnymi hodnotami pro validaci a pridavani novych lig
    existingCountries: string[] = ['Germany', 'Italy', 'France','Spain'];
    existingLeagues: string[] = ['Ligue 1', 'Serie A', 'Bundesliga','La Liga'];
  constructor(
    // Vložím servisku pro Dependency Injection (má vlastní serviska)
    // private je doporučeno pro koncové třídy,
    //  pokud by se jednalo o abstraktní třídu, nebo třídu určenou k dědění použil bych public nebo protected
    private fotbalApiService: FotballApiService,
    private fb: FormBuilder,
    private  modalCtrl: ModalController,
    private leaguesService: LeaguesService, // přidání servisky pro získání nastavení league
  private router: Router // Přidejte Router
  ) {

    this.initLeagues();
    // nastavým výstup funkce při načtení stránky (pozor, před načtením view)
    // zde se žádná data nezískávají!!! data se získají až ve view pomocí | async (pipy async)
    // až pipa async provede onen .subscribe(...), který získá data
    // zde se pouze předavají stejné datové typy getByGeo$(...): Observable<...> >>> this.weather$: Observable<any>
    this.fotbal$ = this.fotbalApiService.getLeague$("England","Premier League")
  }

  ngOnInit() {
    // Inicializace Angular Reactive formuláře s validacemi
    this.leagueForm = this.fb.group({
      newLeagueName: [null, Validators.required],
      newLeagueCountry: [null, [Validators.required, this.validateCountry.bind(this)]],
    });
  }

  /**
   * inicializace počasí
   * není nejefektivnější, jelikož vždy resetuji pole requestů, optimalizace by ale zabrala více řádků a logiky
   *
   * @private
   */
  private async initLeagues() {
    // reset pole na prázdné
    this.fotbals$ = [];
    // získání všech places ze servisky (jsou vždy aktuální)
    // firstValueFrom = získá první (poslední přidaná) data do observable patternu tedy proměnné places$
    const leagues = await firstValueFrom(this.leaguesService.leaguesSample$)
    // firstValueFrom je použití místo .subscribe, data chci totiž jen jedenkrát
    // Pokud bych použil .subscribe došlo by v každém volání funkce initWeather (tedy po zavření modalu)
    // k vytvoření nového odběratele až do n odběratelů. Následkem čeho by se přehltila pamět a aplikace by spadla.
    // this.placesService.places$.subscribe(places => {
    leagues.forEach(league => {
      // kontrola jestli se má zobrazovat na domovské obrazovce nebo ne
      if (league.homepage) {
        // push do resetovaného pole
        // vkládám Observable objekt (pattern)
        // na view pak používám | async stejně jako v případě získání jedné polohy
        // rozdíl je že to celé běží v cyklu, který je dynamický a reaguje na změny pole
        this.fotbals$.push(
          this.fotbalApiService.getLeague$(league.country,league.name)
        )
        // Lepší jednorádkový zápis
        // this.weathers$.push(this.weatherApiService.getByGeo$(place.latitude, place.longitude))
      }
      // }); //původní část z .subscribe (ukončovací)
    })
  }

  /**
   * Get manual data
   *
   * @deprecated Tento způsob není doporučován, lepší možnost je použít weather$ s kombinací s pipou async
   */
  fetchData() {
    // získám data za pomocí metody .subscribe(...)
    // používám servisku, které umožňuje přenášet logiku skrze Dependency Injection (DI)
    this.fotbalApiService.getLeague$("England","Premier League").subscribe(data => {
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
      componentProps: {
        updateLeaguesCallback: () => {
          this.initLeagues();
        }
      }
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
  /**
   * Set detail weather data
   *
   * Nastaví detail data skrze servisku dříve, než se otevře routerLink na view
   * @param league
   */
  goToLeagueDetail(league: Leagues): void {
    this.fotbalApiService.detailLeague = league;
  }
//validace country, jestli existuje v poli stringu zemi
  validateCountry(control:any) {
    if (this.existingCountries.includes(control.value)) {
      return null; // Validní země
    } else {
      return { invalidCountry: true }; // Neplatná země
    }
  }

  //pridani nove ligy jestli probehne validace spravne
  addNewLeague() {
    // Kontrola platnosti formuláře
    if (this.leagueForm.valid) {
      // Získání hodnot ze vstupního formuláře
      const newLeague = {
        id: this.fotbals$.length + 1,
        name: this.leagueForm.value.newLeagueName,
        country: this.leagueForm.value.newLeagueCountry,
        homepage: true,
      };

      // Přidání nové ligy do pole LeagueSamples
      this.leaguesService.addLeague(newLeague);

      // Vymazání hodnot formuláře
      this.leagueForm.reset();
    } else {
      // Zobrazení chyb ve formuláři
      this.leagueForm.markAllAsTouched();
    }
  }



  protected readonly innerHeight = innerHeight;
  protected readonly image = image;
}
