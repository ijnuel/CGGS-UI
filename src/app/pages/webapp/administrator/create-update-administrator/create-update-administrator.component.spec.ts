import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAdministratorComponent } from './create-update-administrator.component';

describe('CreateUpdateAdministratorComponent', () => {
  let component: CreateUpdateAdministratorComponent;
  let fixture: ComponentFixture<CreateUpdateAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateAdministratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
