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
    path: 'detail',
    loadChildren: () => import('./pages/league-detail/league-detail.module').then( m => m.LeagueDetailPageModule)
  },
  {
    path: 'league-detail',
    loadChildren: () => import('./pages/league-detail/league-detail.module').then( m => m.LeagueDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
