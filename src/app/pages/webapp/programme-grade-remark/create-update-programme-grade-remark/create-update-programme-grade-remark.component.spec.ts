import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProgrammeGradeRemarkComponent } from './create-update-programme-grade-remark.component';

describe('CreateUpdateProgrammeGradeRemarkComponent', () => {
  let component: CreateUpdateProgrammeGradeRemarkComponent;
  let fixture: ComponentFixture<CreateUpdateProgrammeGradeRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateProgrammeGradeRemarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateProgrammeGradeRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
