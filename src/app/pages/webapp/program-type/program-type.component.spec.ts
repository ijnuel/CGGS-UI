import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTypeComponent } from './program-type.component';

describe('ProgramTypeComponent', () => {
  let component: ProgramTypeComponent;
  let fixture: ComponentFixture<ProgramTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
