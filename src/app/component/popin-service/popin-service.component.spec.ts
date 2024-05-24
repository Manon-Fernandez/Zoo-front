import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinServiceComponent } from './popin-service.component';

describe('PopinServiceComponent', () => {
  let component: PopinServiceComponent;
  let fixture: ComponentFixture<PopinServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopinServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopinServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
