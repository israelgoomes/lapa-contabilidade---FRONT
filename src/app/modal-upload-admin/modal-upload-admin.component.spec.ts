import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadAdminComponent } from './modal-upload-admin.component';

describe('ModalUploadAdminComponent', () => {
  let component: ModalUploadAdminComponent;
  let fixture: ComponentFixture<ModalUploadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUploadAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUploadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
