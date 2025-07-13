import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSchoolTermSessionComponent } from './create-update-school-term-session.component';

describe('CreateUpdateSchoolTermSessionComponent', () => {
  let component: CreateUpdateSchoolTermSessionComponent;
  let fixture: ComponentFixture<CreateUpdateSchoolTermSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateSchoolTermSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateSchoolTermSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
