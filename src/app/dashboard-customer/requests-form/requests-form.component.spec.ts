import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsFormComponent } from './requests-form.component';

describe('RequestsFormComponent', () => {
  let component: RequestsFormComponent;
  let fixture: ComponentFixture<RequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
