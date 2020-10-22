import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaEquipamentoComponent } from './sala-equipamento.component';

describe('SalaEquipamentoComponent', () => {
  let component: SalaEquipamentoComponent;
  let fixture: ComponentFixture<SalaEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
