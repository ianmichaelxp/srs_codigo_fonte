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
    return this.equipamentosSelecionados;
  }

  getSomaEquipamentos(reserva: ReservaModel) {
    let valorEquip = 0;
      reserva.equipamentos.forEach(element => {
        valorEquip += element.quantidade *this.getAllEquipamentos().find(e => e.id === element.idEquipamento).precoDiario;
    }); 
    return valorEquip;
  }

  //utilizado ao setar quantidade e equipamento
  setEquipamentosSelecionados(equipamento: ReservaEquipamento) {
    this.equipamentosSelecionados.push(equipamento);
  }


  //utilizado no editar
  setReservaEquipamentos(reserva: ReservaModel) {
    this.reservaEquipamentos = [];
    reserva.equipamentos.forEach(element => {
      this.reservaEquipamentos.push(element);
    });
  }

}
