import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStudentComponent } from './create-update-student.component';

describe('CreateUpdateStudentsComponent', () => {
  let component: CreateUpdateStudentComponent;
  let fixture: ComponentFixture<CreateUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
