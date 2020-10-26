import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasCadastroClienteComponent } from './reservas-cadastro-cliente.component';

describe('ReservasCadastroClienteComponent', () => {
  let component: ReservasCadastroClienteComponent;
  let fixture: ComponentFixture<ReservasCadastroClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasCadastroClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasCadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
