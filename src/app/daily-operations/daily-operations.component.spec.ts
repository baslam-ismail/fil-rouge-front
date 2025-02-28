import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOperationComponent } from './daily-operations.component';

describe('DailyOperationComponent', () => {
  let component: DailyOperationComponent;
  let fixture: ComponentFixture<DailyOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
