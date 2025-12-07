import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalRemarkComponent } from './principal-remark.component';

describe('PrincipalRemarkComponent', () => {
  let component: PrincipalRemarkComponent;
  let fixture: ComponentFixture<PrincipalRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalRemarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
