import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableMatSelectComponent } from './searchable-mat-select.component';

describe('SearchableMatSelectComponent', () => {
  let component: SearchableMatSelectComponent;
  let fixture: ComponentFixture<SearchableMatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableMatSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchableMatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
