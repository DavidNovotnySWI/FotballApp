import { Component, OnInit } from '@angular/core';
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import {League, Leagues} from "../../models/fotbal.model";
import {ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.page.html',
  styleUrls: ['./league-detail.page.scss'],
})
export class LeagueDetailPage implements OnInit {

  league: Leagues;


  constructor( private fotbalApiService: FotballApiService,private activatedRoute: ActivatedRoute, private  router: Router,
  ) {
    // získání dat ze servisky
    // správný postup je využít routeGuard, ale tento postup snažší na pochopení
    // data do servisky proměnné detail byly předány při kliknutí na kartu na halvní stránce
    //this.league = this.fotbalApiService.detail!;
    this.league=this.fotbalApiService.detailLeague!;

  }


  ngOnInit() {
    const leagueId = this.league.response[0].league.id
    this.fotbalApiService.getStandingInLeague$(leagueId, 2023)
      .subscribe((data: Leagues) => {
        this.league = data;
      })
  }

  protected readonly innerWidth = innerWidth;

  goBack() {
    this.router.navigate(['/tabs/tab1']); // nebo kam potřebujete zpět navigovat
  }

  /**
   * Set detail team data
   *
   * Nastaví detail data skrze servisku dříve, než se otevře routerLink na view
   * @param league
   */
  goToTeamDetail(league:Leagues,leagueId: number, teamId: number ): void {
    // Při kliknutí na kartu provede navigaci na stránku detailu ligy s předáním id ligy
    this.fotbalApiService.detailTeam =league;
    this.fotbalApiService.detailTeamLeagueId =leagueId;
    this.fotbalApiService.detailTeamId =teamId;

  }
}
