import { Component, OnInit } from '@angular/core';
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import {League, Leagues} from "../../models/fotbal.model";
import {ActivatedRoute,Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Matches} from "../../models/fixtures";

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.page.html',
  styleUrls: ['./league-detail.page.scss'],
})
export class LeagueDetailPage implements OnInit {

  league: Leagues;
  league$?:Observable<Leagues>;
  leagueMatches$?:Observable<Matches>;
  selectedView: 'standings' | 'league-matches' = 'standings';


  constructor( private fotbalApiService: FotballApiService,private activatedRoute: ActivatedRoute, private  router: Router,
  ) {
    // získání dat ze servisky
    // správný postup je využít routeGuard, ale tento postup snažší na pochopení
    // data do servisky proměnné detail byly předány při kliknutí na kartu na halvní stránce
    //this.league = this.fotbalApiService.detail!;
    this.league=this.fotbalApiService.detailLeague!;

  }


  ngOnInit() {
    const leagueId = this.league.response[0].league.id;

    // Zkontrolovat, zda existuji data v Local Storage a zda nejsou zastaralá
    const storedData = localStorage.getItem(`leagueDetailData/${leagueId}`);
    if (storedData) {
      const storedLeague = JSON.parse(storedData) as Leagues;
      const storedTimestamp = localStorage.getItem(`leagueDetailTimestamp/${leagueId}`);
      const currentTimestamp = new Date().getTime();
      const timeDifference = currentTimestamp - Number(storedTimestamp);

      // Použiti dat z Local Storage, pokud nejsou starší než  1 hodina
      if (timeDifference < 60 * 60 * 1000) {
        this.league = storedLeague;
        this.league$ = of(storedLeague);
        return;
      }
    }

    this.league$ = this.fotbalApiService.getStandingInLeague$(leagueId, 2023);

    // aktualni data  do Local Storage
    this.league$.subscribe(
        (response) => {
          localStorage.setItem(`leagueDetailData/${leagueId}`, JSON.stringify(response));
          localStorage.setItem(`leagueDetailTimestamp/${leagueId}`, new Date().getTime().toString());
        }
    );
  }

  protected readonly innerWidth = innerWidth;

  goBack() {
    this.router.navigate(['/tabs/home']); // nebo kam potřebujete zpět navigovat
  }

  /**
   * Set detail team data
   *
   * Nastaví detail data skrze servisku dříve, než se otevře routerLink na view
   * @param league
   */
  goToTeamDetail(leagueId: number, teamId: number ): void {
    // Při kliknutí na kartu provede navigaci na stránku detailu ligy s předáním id ligy
    this.fotbalApiService.detailTeamLeagueId =leagueId;
    this.fotbalApiService.detailTeamId =teamId;

  }

  loadLeagueMatches() {
    // Zavolejte API pro načítání zápasů
    const leagueId = this.league.response[0].league.id;
    // Dnešní datum
    const today = new Date();

    // Převod na formát Y-m-d
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // dateFrom bude dnešní den ve formátu Y-m-d
    const dateFrom: string = formatDate(today);

    // dateTo bude dnešní den o 30 dnech později ve formátu Y-m-d
    const dateTo: string = formatDate(new Date(today.setDate(today.getDate() + 7)));

    const storedData = localStorage.getItem(`leagueMatches/${leagueId}`);
    if (storedData) {
      const storedLeague = JSON.parse(storedData) as Matches;
      const storedTimestamp = localStorage.getItem(`leagueMatchesTimestamp/${leagueId}`);
      const currentTimestamp = new Date().getTime();
      const timeDifference = currentTimestamp - Number(storedTimestamp);

      // Použiti dat z Local Storage, pokud nejsou starší než  1 hodina
      if (timeDifference < 60 * 60 * 1000) {
        this.leagueMatches$ = of(storedLeague);
        return;
      }
    }
    this.leagueMatches$=this.fotbalApiService.getLeagueMatches$(leagueId,2023,dateFrom,dateTo);
    this.leagueMatches$.subscribe(
      (response) => {
        localStorage.setItem(`leagueMatches/${leagueId}`, JSON.stringify(response));
        localStorage.setItem(`leagueMatchesTimestamp/${leagueId}`, new Date().getTime().toString());
      });

  }
}
