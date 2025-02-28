import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestModalComponent } from './service-request-modal.component';

describe('ServiceRequestModalComponent', () => {
  let component: ServiceRequestModalComponent;
  let fixture: ComponentFixture<ServiceRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
