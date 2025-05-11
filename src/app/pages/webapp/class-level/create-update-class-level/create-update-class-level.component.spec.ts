import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClassLevelComponent } from './create-update-class-level.component';

describe('CreateUpdateClassLevelComponent', () => {
  let component: CreateUpdateClassLevelComponent;
  let fixture: ComponentFixture<CreateUpdateClassLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateClassLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateClassLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
