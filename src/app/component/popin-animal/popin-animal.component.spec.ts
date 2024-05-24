import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinAnimalComponent } from './popin-animal.component';

describe('PopinAnimalComponent', () => {
  let component: PopinAnimalComponent;
  let fixture: ComponentFixture<PopinAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopinAnimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopinAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
