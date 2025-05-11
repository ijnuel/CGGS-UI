import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStateComponent } from './create-update-state.component';

describe('CreateUpdateStateComponent', () => {
  let component: CreateUpdateStateComponent;
  let fixture: ComponentFixture<CreateUpdateStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
