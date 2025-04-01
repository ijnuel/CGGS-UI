import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStudentsComponent } from './create-update-students.component';

describe('CreateUpdateStudentsComponent', () => {
  let component: CreateUpdateStudentsComponent;
  let fixture: ComponentFixture<CreateUpdateStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
