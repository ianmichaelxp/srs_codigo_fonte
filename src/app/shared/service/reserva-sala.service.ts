import { SalaService } from 'src/app/shared/service/sala.service';
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
  sala: SalaModel;
  reserva : ReservaModel;
  idCliente : number;
  idSala:number;
  constructor(private clienteService : ClienteService, private salaService: SalaService) { }

  setIdCliente(id : number)
  {
    this.idCliente = id;
  }

  setIdSala(id : number)
  {
    this.idSala = id;
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
  

  getSala(){
    this.salaService.getSalaPorId(this.idSala).subscribe(
      (result:any) => {
        this.sala = result;
      });
      return this.sala;
  }
}
