import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesAdminComponent } from './solicitacoes-admin.component';

describe('SolicitacoesAdminComponent', () => {
  let component: SolicitacoesAdminComponent;
  let fixture: ComponentFixture<SolicitacoesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacoesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
