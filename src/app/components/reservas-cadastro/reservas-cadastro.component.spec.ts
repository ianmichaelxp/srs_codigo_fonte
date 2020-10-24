import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasCadastroComponent } from './reservas-cadastro.component';

describe('ReservasCadastroComponent', () => {
  let component: ReservasCadastroComponent;
  let fixture: ComponentFixture<ReservasCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
