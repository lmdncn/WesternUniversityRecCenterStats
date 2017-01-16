/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BbStatsComponent } from './bb-stats.component';

describe('BbStatsComponent', () => {
  let component: BbStatsComponent;
  let fixture: ComponentFixture<BbStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
