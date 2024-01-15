import { Component, OnInit } from '@angular/core';
import { FotballApiService } from "../../services/fotbal-api/fotbal-api.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Leagues } from "../../models/fotbal.model";
import {Matches} from "../../models/fixtures";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  matches$?: Observable<Matches>;
  leagueId: any;
  teamId: any;

  constructor(private fotbalApiService: FotballApiService, private router: Router) {
    this.leagueId = this.fotbalApiService.detailTeamLeagueId;
    this.teamId = this.fotbalApiService.detailTeamId;
  }

  ngOnInit() {
    this.matches$ = this.fotbalApiService.getTeamMatches$(this.leagueId, 2023, this.teamId);
  }
}
