import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisPopinComponent } from './avis-popin.component';

describe('AvisPopinComponent', () => {
  let component: AvisPopinComponent;
  let fixture: ComponentFixture<AvisPopinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisPopinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvisPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
