import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamDetailPage } from './team-detail.page';
import {async} from "rxjs";

describe('TeamDetailPage', () => {
  let component: TeamDetailPage;
  let fixture: ComponentFixture<TeamDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeamDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
