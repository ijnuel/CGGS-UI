import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateLocalGovernmentAreaComponent } from './create-update-local-government-area.component';

describe('CreateUpdateLocalGovernmentAreaComponent', () => {
  let component: CreateUpdateLocalGovernmentAreaComponent;
  let fixture: ComponentFixture<CreateUpdateLocalGovernmentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateLocalGovernmentAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateLocalGovernmentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
