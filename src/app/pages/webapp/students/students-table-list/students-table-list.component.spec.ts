import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTableListComponent } from './students-table-list.component';

describe('StudentsTableListComponent', () => {
  let component: StudentsTableListComponent;
  let fixture: ComponentFixture<StudentsTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsTableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
