import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStudentClassComponent } from './create-update-student-class.component';

describe('CreateUpdateStudentClassComponent', () => {
  let component: CreateUpdateStudentClassComponent;
  let fixture: ComponentFixture<CreateUpdateStudentClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateStudentClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateStudentClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
