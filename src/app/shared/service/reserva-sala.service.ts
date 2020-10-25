import { ClienteModel } from './../model/cliente.model';
import { ReservaModel } from './../model/reserva.model';
import { ClienteService } from './cliente.service';
import { SalaModel } from './../model/sala.model';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaSalaService {

  cliente : ClienteModel;
  reserva : ReservaModel;
  idCliente : number;
  constructor(private clienteService : ClienteService) { }

  setId(id : number)
  {
    this.idCliente = id;
  }

  getCliente()
  {
    this.clienteService.getById(this.idCliente).subscribe(
      (result : any) => {
      this.cliente = result;
      }
    );
    return this.cliente;
  }
}
