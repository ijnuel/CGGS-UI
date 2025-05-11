import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalGovernmentAreaComponent } from './local-government-area.component';

describe('LocalGovernmentAreaComponent', () => {
  let component: LocalGovernmentAreaComponent;
  let fixture: ComponentFixture<LocalGovernmentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalGovernmentAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalGovernmentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
