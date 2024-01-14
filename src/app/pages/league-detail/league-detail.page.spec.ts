import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueDetailPage } from './league-detail.page';
import {async} from "rxjs";

describe('LeagueDetailPage', () => {
  let component: LeagueDetailPage;
  let fixture: ComponentFixture<LeagueDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeagueDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
