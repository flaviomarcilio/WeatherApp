import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesTypeaheadComponent } from './cities-typeahead.component';

describe('CitiesTypeheadComponent', () => {
  let component: CitiesTypeaheadComponent;
  let fixture: ComponentFixture<CitiesTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
