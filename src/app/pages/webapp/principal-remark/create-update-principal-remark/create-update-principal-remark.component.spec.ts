import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePrincipalRemarkComponent } from './create-update-principal-remark.component';

describe('CreateUpdatePrincipalRemarkComponent', () => {
  let component: CreateUpdatePrincipalRemarkComponent;
  let fixture: ComponentFixture<CreateUpdatePrincipalRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdatePrincipalRemarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdatePrincipalRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
