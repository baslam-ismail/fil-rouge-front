import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOperationsModalComponent } from './daily-operations-modal.component';

describe('DailyOperationsModalComponent', () => {
  let component: DailyOperationsModalComponent;
  let fixture: ComponentFixture<DailyOperationsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyOperationsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyOperationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
