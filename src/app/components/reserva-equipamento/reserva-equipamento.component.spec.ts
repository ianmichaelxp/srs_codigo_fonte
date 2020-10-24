import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEquipamentoComponent } from './reserva-equipamento.component';

describe('ReservaEquipamentoComponent', () => {
  let component: ReservaEquipamentoComponent;
  let fixture: ComponentFixture<ReservaEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
