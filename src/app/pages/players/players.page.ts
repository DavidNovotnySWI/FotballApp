import { Component, OnInit } from '@angular/core';
import {Leagues} from "../../models/fotbal.model";
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";

import { Router} from "@angular/router";
import {forkJoin, Observable, of} from 'rxjs';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

    leagues$: Observable<Leagues>[]=[];

    teamId:number;
    leagueId:number;
  constructor(private fotbalApiService: FotballApiService, private  router: Router)
  {
      this.teamId=this.fotbalApiService.detailTeamId!;
      this.leagueId=this.fotbalApiService.detailTeamLeagueId!;
  }

  ngOnInit() {
    const dataKey = `teams/players/${this.teamId}`;
    const timestampKey = `timestamp/teams/players/${this.teamId}`;
    const data = localStorage.getItem(dataKey);
    const timestamp = localStorage.getItem(timestampKey);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const now = new Date();

    //jestli jsou data vic nez den stara prepisu localdata
    if (data && timestamp && (now.getTime() - Number(timestamp)) <= oneDay) {
      this.leagues$ = JSON.parse(data).map((item: any) => of(item));
    } else {
      //volani takto protoze odpoved se vraci v pages
      for (let page = 1; page <= 3; page++) {
        //promena pole observablu Leagues
        this.leagues$.push(this.fotbalApiService.getTeamPlayers$(this.teamId, this.leagueId, 2023, page));
      }
      //forkjoin when you have a group of observables and only care about the final emitted value of each
      forkJoin(this.leagues$).subscribe(res => {
        localStorage.setItem(dataKey, JSON.stringify(res));
        localStorage.setItem(timestampKey, String(now.getTime()));
      });
    }
  }




}
