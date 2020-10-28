import { EquipamentoService } from 'src/app/shared/service/equipamento.service';
import { EquipamentoModel } from './../model/equipamento.model';
import { SalaEquipamentoService } from './salaEquipamento.service';
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

  cliente: ClienteModel[];
  salas: SalaModel[];
  allSalas: SalaModel[];
  sala: SalaModel;
  reserva: ReservaModel;
  idCliente: number;
  idSala: number;
  valorDiario: number = 0;
  equipamentos: EquipamentoModel[] = [];
  constructor(private clienteService: ClienteService, private salaService: SalaService, private salaEquipamentoService: SalaEquipamentoService,
    private equipamentoService: EquipamentoService) {
    salaService.getSalas().subscribe((result: any) => {
      this.allSalas = result;
    })
    equipamentoService.getEquipamentos().subscribe((result : any)=>{
      this.equipamentos = result;
    })
  }

  setIdCliente(id: number) {
    this.idCliente = id;
  }

  calculaValorSala(id: number) {
    this.idSala = id;
    this.valorDiario = 0;
    this.sala = this.allSalas.find(s => s.id === id);
    this.sala.equipamentos.forEach(equipamento => {
      this.valorDiario += this.equipamentos.find(e => e.id === equipamento.idEquipamento).precoDiario * equipamento.quantidade;
    })
    this.valorDiario+= this.sala.precoDiario;
    return this.valorDiario;
  }

  getCliente() {
    this.cliente = [];
    this.clienteService.getById(this.idCliente).subscribe(
      (result: any) => {
        this.cliente.push(result);
      }
    );
    return this.cliente;
  }


  getSala(): SalaModel[] {
    this.salas = [];
    this.salaService.getSalaPorId(this.idSala).subscribe(
      (result: any) => {
        this.salas.push(result);
      });
    return this.salas;
  }

  getIdSala() {
    return this.idSala;
  }
  getTipoSala(id: number) {
    return TipoSala[id];
  }
  getValorDiario() {
    return this.valorDiario;
  }
}
