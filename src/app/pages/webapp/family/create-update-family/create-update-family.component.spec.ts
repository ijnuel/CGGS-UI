import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateFamilyComponent } from './create-update-family.component';

describe('CreateUpdateFamilyComponent', () => {
  let component: CreateUpdateFamilyComponent;
  let fixture: ComponentFixture<CreateUpdateFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateFamilyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
