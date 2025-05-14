import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateParentComponent } from './create-update-parent.component';

describe('CreateUpdateParentComponent', () => {
  let component: CreateUpdateParentComponent;
  let fixture: ComponentFixture<CreateUpdateParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
