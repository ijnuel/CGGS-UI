import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTermSessionComponent } from './school-term-session.component';

describe('SchoolTermSessionComponent', () => {
  let component: SchoolTermSessionComponent;
  let fixture: ComponentFixture<SchoolTermSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolTermSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolTermSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
