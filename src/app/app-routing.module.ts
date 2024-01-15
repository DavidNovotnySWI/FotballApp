import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  // vložení endpointu /detail s lazy loadingem
  {
    path: 'league/:id',
    loadChildren: () => import('./pages/league-detail/league-detail.module').then( m => m.LeagueDetailPageModule)
  },
  {
    path: 'team/:id',
    loadChildren: () => import('./pages/team-detail/team-detail.module').then( m => m.TeamDetailPageModule)
  },
  {
    path: 'team/:id/players',
    loadChildren: () => import('./pages/players/players.module').then( m => m.PlayersPageModule)
  },
  {
    path: 'team/:id/matches',
    loadChildren: () => import('./pages/matches/matches.module').then( m => m.MatchesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
