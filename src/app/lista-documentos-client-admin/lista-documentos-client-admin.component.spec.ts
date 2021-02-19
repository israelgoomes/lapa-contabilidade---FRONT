import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDocumentosClientAdminComponent } from './lista-documentos-client-admin.component';

describe('ListaDocumentosClientAdminComponent', () => {
  let component: ListaDocumentosClientAdminComponent;
  let fixture: ComponentFixture<ListaDocumentosClientAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDocumentosClientAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDocumentosClientAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
