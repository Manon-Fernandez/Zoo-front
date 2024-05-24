import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinHabitatComponent } from './popin-habitat.component';

describe('PopinHabitatComponent', () => {
  let component: PopinHabitatComponent;
  let fixture: ComponentFixture<PopinHabitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopinHabitatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopinHabitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
