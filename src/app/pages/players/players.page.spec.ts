import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersPage } from './players.page';
import {async} from "rxjs";

describe('PlayersPage', () => {
  let component: PlayersPage;
  let fixture: ComponentFixture<PlayersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
