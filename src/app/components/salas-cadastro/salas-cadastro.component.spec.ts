import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasCadastroComponent } from './salas-cadastro.component';

describe('SalasCadastroComponent', () => {
  let component: SalasCadastroComponent;
  let fixture: ComponentFixture<SalasCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
