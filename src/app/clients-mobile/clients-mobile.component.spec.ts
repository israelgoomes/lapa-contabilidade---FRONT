import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMobileComponent } from './clients-mobile.component';

describe('ClientsMobileComponent', () => {
  let component: ClientsMobileComponent;
  let fixture: ComponentFixture<ClientsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
