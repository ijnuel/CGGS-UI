import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStaffComponent } from './create-update-staff.component';

describe('CreateUpdateStaffComponent', () => {
  let component: CreateUpdateStaffComponent;
  let fixture: ComponentFixture<CreateUpdateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
