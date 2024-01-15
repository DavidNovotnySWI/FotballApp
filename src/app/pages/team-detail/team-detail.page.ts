import { Component, OnInit } from '@angular/core';
import {FotballApiService} from "../../services/fotbal-api/fotbal-api.service";
import {League, Leagues} from "../../models/fotbal.model";
import {ActivatedRoute,Router} from "@angular/router";
import {codeSharp} from "ionicons/icons";
import {Observable, of} from "rxjs";
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  league$?: Observable<Leagues>;
  teamId:number;
  leagueId:number;

  constructor(private fotbalApiService: FotballApiService,private activatedRoute: ActivatedRoute, private  router: Router) {
    this.teamId=this.fotbalApiService.detailTeamId!;
    this.leagueId=this.fotbalApiService.detailTeamLeagueId!;
  }

  ngOnInit() {
    const storedData = localStorage.getItem(`teamDetailData/${this.teamId}`);
    if (storedData) {
      const storedLeague = JSON.parse(storedData) as Leagues;

        this.league$ = of(storedLeague);
        return;
      }


    this.league$=this.fotbalApiService.getTeamInfo$(this.leagueId, 2023,this.teamId);

    this.league$.subscribe(
      (response) => {
        localStorage.setItem(`teamDetailData/${this.teamId}`, JSON.stringify(response));
      }
    );
  }

  goBack() {
    console.log(`League ID for Go Back: ${this.leagueId}`);
    this.router.navigate([`/leagues/:${this.leagueId}`]);

  }

  goToPlayers(leagueId: number, teamId: number ): void {
    // Při kliknutí na kartu provede navigaci na stránku detailu ligy s předáním id ligy
    this.fotbalApiService.detailTeamLeagueId =leagueId;
    this.fotbalApiService.detailTeamId =teamId;

  }
}
