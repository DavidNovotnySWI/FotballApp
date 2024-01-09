import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeagueDetailPageRoutingModule } from './league-detail-routing.module';

import { LeagueDetailPage } from './league-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeagueDetailPageRoutingModule
  ],
  declarations: [LeagueDetailPage]
})
export class LeagueDetailPageModule {}
