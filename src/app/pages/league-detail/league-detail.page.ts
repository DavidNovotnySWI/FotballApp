import { Component, OnInit } from '@angular/core';
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import {Leagues} from "../../models/fotbal.model";
@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.page.html',
  styleUrls: ['./league-detail.page.scss'],
})
export class LeagueDetailPage implements OnInit {

  league: Leagues;
  constructor( private fotbalApiService: FotballApiService
  ) {
    // získání dat ze servisky
    // správný postup je využít routeGuard, ale tento postup snažší na pochopení
    // data do servisky proměnné detail byly předány při kliknutí na kartu na halvní stránce
    this.league = this.fotbalApiService.detail!;
  }

  ngOnInit() {
  }

}
