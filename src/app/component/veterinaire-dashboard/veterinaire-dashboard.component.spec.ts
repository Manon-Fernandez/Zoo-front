import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaireDashboardComponent } from './veterinaire-dashboard.component';

describe('VeterinaireDashboardComponent', () => {
  let component: VeterinaireDashboardComponent;
  let fixture: ComponentFixture<VeterinaireDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinaireDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeterinaireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
