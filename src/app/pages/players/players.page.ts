import { Component, OnInit } from '@angular/core';
import {Leagues} from "../../models/fotbal.model";
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import { Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

    league$?: Observable<Leagues>;
    teamId:number;
    leagueId:number;
  constructor(private fotbalApiService: FotballApiService, private  router: Router)
  {
      this.teamId=this.fotbalApiService.detailTeamId!;
      this.leagueId=this.fotbalApiService.detailTeamLeagueId!;
  }

  ngOnInit() {
      this.league$=this.fotbalApiService.getTeamPlayers$(this.teamId,this.leagueId, 2023);
  }

}
