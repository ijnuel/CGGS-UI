import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateApplicationComponent } from './create-update-application.component';

describe('CreateUpdateApplicationComponent', () => {
  let component: CreateUpdateApplicationComponent;
  let fixture: ComponentFixture<CreateUpdateApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
