import { VersionTagModule } from '@nuvem/angular-base';
import { SalaService } from 'src/app/shared/service/sala.service';
import { ClienteModel } from './../model/cliente.model';
import { ReservaModel } from './../model/reserva.model';
import { ClienteService } from './cliente.service';
import { SalaModel, TipoSala } from './../model/sala.model';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaSalaService {

  cliente : ClienteModel[];
  sala: SalaModel[];
  reserva : ReservaModel;
  idCliente : number;
  idSala:number;
  valorDiario: number = 0;
  constructor(private clienteService : ClienteService, private salaService: SalaService) { }

  setIdCliente(id : number)
  {
    this.idCliente = id;
  }

  calculaValorSala(id : number)
  {
    this.idSala = id;
    this.salaService.getSalaPorId(id).subscribe(
      (result : SalaModel) =>
      {
        this.valorDiario = result.precoDiario;
      }
    )
    return this.valorDiario;
  }

  getCliente()
  {
    this.cliente = [];
    this.clienteService.getById(this.idCliente).subscribe(
      (result : any) => {
      this.cliente.push(result);
      }
    );
    return this.cliente;
  }
  

  getSala() : SalaModel[]{
    this.sala = [];
    this.salaService.getSalaPorId(this.idSala).subscribe(
      (result:any) => {
        this.sala.push(result);
      });
      return this.sala;
  }

  getIdSala(){
    return this.idSala;
  }
  getTipoSala(id: number) {
    return TipoSala[id];
  }
  getValorDiario(){
    return this.valorDiario;
  }
}
