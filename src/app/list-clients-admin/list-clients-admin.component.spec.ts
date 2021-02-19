import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsAdminComponent } from './list-clients-admin.component';

describe('ListClientsAdminComponent', () => {
  let component: ListClientsAdminComponent;
  let fixture: ComponentFixture<ListClientsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
