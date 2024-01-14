import { Component, OnInit } from '@angular/core';
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import {League, Leagues} from "../../models/fotbal.model";
import {ActivatedRoute,Router} from "@angular/router";
import {codeSharp} from "ionicons/icons";
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  league: Leagues;
  teamId:number;
  leagueId:number;

  constructor(private fotbalApiService: FotballApiService,private activatedRoute: ActivatedRoute, private  router: Router) {
    this.league=this.fotbalApiService.detailTeam!;
    this.teamId=this.fotbalApiService.detailTeamId!;
    this.leagueId=this.fotbalApiService.detailTeamLeagueId!;
  }

  ngOnInit() {
    this.fotbalApiService.getTeamInfo$(this.leagueId, 2023,this.teamId)
      .subscribe((data: Leagues) => {
        this.league = data;
      })
  }

  goBack() {
    console.log(`League ID for Go Back: ${this.leagueId}`);
    this.router.navigate([`/tabs/tab1`]);

  }
}
