import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosMobileComponent } from './servicos-mobile.component';

describe('ServicosMobileComponent', () => {
  let component: ServicosMobileComponent;
  let fixture: ComponentFixture<ServicosMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
