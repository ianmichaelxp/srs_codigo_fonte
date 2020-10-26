import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaSalaComponent } from './reserva-sala.component';

describe('ReservaSalaComponent', () => {
  let component: ReservaSalaComponent;
  let fixture: ComponentFixture<ReservaSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
