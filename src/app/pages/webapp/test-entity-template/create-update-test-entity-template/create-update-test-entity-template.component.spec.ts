import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTestEntityTemplateComponent } from './create-update-test-entity-template.component';

describe('CreateUpdateTestEntityTemplateComponent', () => {
  let component: CreateUpdateTestEntityTemplateComponent;
  let fixture: ComponentFixture<CreateUpdateTestEntityTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateTestEntityTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateTestEntityTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
