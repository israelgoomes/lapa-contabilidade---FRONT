import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRequisicaoComponent } from './modal-requisicao.component';

describe('ModalRequisicaoComponent', () => {
  let component: ModalRequisicaoComponent;
  let fixture: ComponentFixture<ModalRequisicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRequisicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
