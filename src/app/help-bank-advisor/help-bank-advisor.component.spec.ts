import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBankAdvisorComponent } from './help-bank-advisor.component';

describe('HelpBankAdvisorComponent', () => {
  let component: HelpBankAdvisorComponent;
  let fixture: ComponentFixture<HelpBankAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpBankAdvisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpBankAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
