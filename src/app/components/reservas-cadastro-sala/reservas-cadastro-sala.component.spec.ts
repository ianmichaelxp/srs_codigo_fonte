import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasCadastroSalaComponent } from './reservas-cadastro-sala.component';

describe('ReservasCadastroSalaComponent', () => {
  let component: ReservasCadastroSalaComponent;
  let fixture: ComponentFixture<ReservasCadastroSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasCadastroSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasCadastroSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
