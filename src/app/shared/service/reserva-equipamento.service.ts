import { SalaEquipamentoService } from 'src/app/shared/service/salaEquipamento.service';
import { Injectable } from '@angular/core';
import { EquipamentoModel } from '../model/equipamento.model';
import { ReservaEquipamento, ReservaModel } from '../model/reserva.model';
import { EquipamentoService } from './equipamento.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaEquipamentoService {

  equipamentos: EquipamentoModel[] = [];
  reserva: ReservaModel = new ReservaModel;
  equipamentosSelecionados: ReservaEquipamento[] = [];
  equipamento: EquipamentoModel;
  reservaEquipamentos: ReservaEquipamento[] = [];
  valorDiario: number;

  constructor(private equipamentoService: EquipamentoService, salaEquipamentoService: SalaEquipamentoService) {
    this.getAllEquipamentos();
  }

  getValorDiario() {
    return this.valorDiario;
  }


  setReserva(reserva: ReservaModel) {
    this.reserva = reserva;
  }

  getAllEquipamentosReserva() {
    let equipamentosSel = [];
    this.reserva.equipamentos.forEach(element => {
      equipamentosSel.push(this.equipamentos.find(e => e.id === element.idEquipamento));
    });
    return equipamentosSel;
  }

  getAllEquipamentos(): EquipamentoModel[] {
    this.equipamentoService.getEquipamentos().subscribe((result: EquipamentoModel[]) => {
      this.equipamentos = result;
    })
    return this.equipamentos;
  }

  getReservaEquipamentos() {
    console.log(this.equipamentosSelecionados);
    return this.equipamentosSelecionados;
  }

  getSomaEquipamentos(reserva: ReservaModel) {
    let valorEquip = 0;
      reserva.equipamentos.forEach(element => {
        valorEquip += element.quantidade *this.equipamentos.find(e => e.id === element.idEquipamento).precoDiario;
    }); 
    this.equipamentosSelecionados = [];
    return valorEquip;
  }

  //utilizado ao setar quantidade e equipamento
  setEquipamentosSelecionados(equipamento: ReservaEquipamento) {
    if(this.equipamentosSelecionados.find(e => e.idEquipamento === equipamento.idEquipamento))
    {
      this.equipamentosSelecionados.splice(equipamento.idEquipamento, 1);
    }
    this.equipamentosSelecionados.push(equipamento);
  }


  //utilizado no editar
  setReservaEquipamentos(reserva: ReservaModel) {
    this.equipamentosSelecionados = [];
    reserva.equipamentos.forEach(element => {
      this.equipamentosSelecionados.push(element);
    });
  }

}
