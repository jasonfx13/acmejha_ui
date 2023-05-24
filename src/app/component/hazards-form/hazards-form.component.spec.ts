import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardsFormComponent } from './hazards-form.component';

describe('HazardsFormComponent', () => {
  let component: HazardsFormComponent;
  let fixture: ComponentFixture<HazardsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
