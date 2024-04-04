import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedCardComponent } from './listed-card.component';

describe('ListedCardComponent', () => {
  let component: ListedCardComponent;
  let fixture: ComponentFixture<ListedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
