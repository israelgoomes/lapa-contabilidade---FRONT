import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMobileComponent } from './services-mobile.component';

describe('ServicesMobileComponent', () => {
  let component: ServicesMobileComponent;
  let fixture: ComponentFixture<ServicesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
