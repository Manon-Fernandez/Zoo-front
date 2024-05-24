import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPopinComponent } from './detail-popin.component';

describe('DetailPopinComponent', () => {
  let component: DetailPopinComponent;
  let fixture: ComponentFixture<DetailPopinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPopinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
