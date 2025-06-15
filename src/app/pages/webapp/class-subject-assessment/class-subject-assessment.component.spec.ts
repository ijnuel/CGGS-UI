import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSubjectAssessmentComponent } from './class-subject-assessment.component';

describe('ClassSubjectAssessmentComponent', () => {
  let component: ClassSubjectAssessmentComponent;
  let fixture: ComponentFixture<ClassSubjectAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSubjectAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassSubjectAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
