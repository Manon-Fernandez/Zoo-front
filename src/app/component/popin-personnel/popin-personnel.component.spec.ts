import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinPersonnelComponent } from './popin-personnel.component';

describe('PopinPersonnelComponent', () => {
  let component: PopinPersonnelComponent;
  let fixture: ComponentFixture<PopinPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopinPersonnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopinPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
