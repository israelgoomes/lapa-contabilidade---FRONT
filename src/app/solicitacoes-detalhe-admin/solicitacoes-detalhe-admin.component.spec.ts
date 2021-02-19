import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesDetalheAdminComponent } from './solicitacoes-detalhe-admin.component';

describe('SolicitacoesDetalheAdminComponent', () => {
  let component: SolicitacoesDetalheAdminComponent;
  let fixture: ComponentFixture<SolicitacoesDetalheAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacoesDetalheAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesDetalheAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
