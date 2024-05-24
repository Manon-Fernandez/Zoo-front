import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSantePopinComponent } from './create-sante-popin.component';

describe('CreateSantePopinComponent', () => {
  let component: CreateSantePopinComponent;
  let fixture: ComponentFixture<CreateSantePopinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSantePopinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSantePopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
