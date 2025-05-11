import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCountryComponent } from './create-update-country.component';

describe('CreateUpdateCountryComponent', () => {
  let component: CreateUpdateCountryComponent;
  let fixture: ComponentFixture<CreateUpdateCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
