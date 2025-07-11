import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeGradeRemarkComponent } from './programme-grade-remark.component';

describe('ProgrammeGradeRemarkComponent', () => {
  let component: ProgrammeGradeRemarkComponent;
  let fixture: ComponentFixture<ProgrammeGradeRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeGradeRemarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeGradeRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
