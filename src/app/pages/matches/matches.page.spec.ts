import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesPage } from './matches.page';
import {async} from "rxjs";

describe('MatchesPage', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
