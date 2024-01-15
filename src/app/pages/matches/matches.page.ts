import { Component, OnInit } from '@angular/core';
import { FotballApiService } from "../../services/fotbal-api/fotbal-api.service";
import { Router } from "@angular/router";
import {Observable, of} from 'rxjs';
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
    // Zkontrolovat, zda existuji data v Local Storage a zda nejsou zastaralá
    const storedData = localStorage.getItem(`team/${this.teamId}/matches`);
    if (storedData) {
      const storedLeague = JSON.parse(storedData) as Matches;
      const storedTimestamp = localStorage.getItem(`team/${this.teamId}/matchesTimestamp`);
      const currentTimestamp = new Date().getTime();
      const timeDifference = currentTimestamp - Number(storedTimestamp);

      // Použiti dat z Local Storage, pokud nejsou starší než  1 hodina
      if (timeDifference < 60 * 60 * 1000) {
        this.matches$ = of(storedLeague);
        return;
      }
    }

    this.matches$ = this.fotbalApiService.getTeamMatches$(this.leagueId, 2023, this.teamId);

    this.matches$.subscribe(
      (response) => {
        localStorage.setItem(`team/${this.teamId}/matches`, JSON.stringify(response));
        localStorage.setItem(`team/${this.teamId}/matchesTimestamp`, new Date().getTime().toString());
      }
    );
  }
}
