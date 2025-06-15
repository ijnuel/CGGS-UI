import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClassSubjectComponent } from './create-update-class-subject.component';

describe('CreateUpdateClassSubjectComponent', () => {
  let component: CreateUpdateClassSubjectComponent;
  let fixture: ComponentFixture<CreateUpdateClassSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateClassSubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateClassSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
