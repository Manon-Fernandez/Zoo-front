import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNourriPopinComponent } from './create-nourri-popin.component';

describe('CreateNourriPopinComponent', () => {
  let component: CreateNourriPopinComponent;
  let fixture: ComponentFixture<CreateNourriPopinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNourriPopinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNourriPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
