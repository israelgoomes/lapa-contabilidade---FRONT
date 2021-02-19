import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesClienteComponent } from './solicitacoes-cliente.component';

describe('SolicitacoesClienteComponent', () => {
  let component: SolicitacoesClienteComponent;
  let fixture: ComponentFixture<SolicitacoesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitacoesClienteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
