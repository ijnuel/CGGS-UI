import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEntityTemplateComponent } from './test-entity-template.component';

describe('TestEntityTemplateComponent', () => {
  let component: TestEntityTemplateComponent;
  let fixture: ComponentFixture<TestEntityTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEntityTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestEntityTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
