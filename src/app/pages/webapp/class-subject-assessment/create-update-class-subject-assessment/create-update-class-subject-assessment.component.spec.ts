import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClassSubjectAssessmentComponent } from './create-update-class-subject-assessment.component';

describe('CreateUpdateClassSubjectAssessmentComponent', () => {
  let component: CreateUpdateClassSubjectAssessmentComponent;
  let fixture: ComponentFixture<CreateUpdateClassSubjectAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateClassSubjectAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateClassSubjectAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
