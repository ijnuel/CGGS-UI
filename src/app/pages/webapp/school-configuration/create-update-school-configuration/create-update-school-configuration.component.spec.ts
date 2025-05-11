import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSchoolConfigurationComponent } from './create-update-school-configuration.component';

describe('CreateUpdateSchoolConfigurationComponent', () => {
  let component: CreateUpdateSchoolConfigurationComponent;
  let fixture: ComponentFixture<CreateUpdateSchoolConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateSchoolConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateSchoolConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
