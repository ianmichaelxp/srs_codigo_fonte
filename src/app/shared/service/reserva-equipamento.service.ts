import { Injectable } from '@angular/core';
import { EquipamentoSalaModel } from '../model/equipamento.model';
import { ReservaEquipamento, ReservaModel } from '../model/reserva.model';
import { EquipamentoService } from './equipamento.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaEquipamentoService {

  equipamentos: EquipamentoSalaModel[];
  reserva: ReservaModel;
  equipamentosSelecionados: EquipamentoSalaModel[] = [];
  reservaEquipamentos: ReservaEquipamento[] = [];
  equipamento: EquipamentoSalaModel;
  valorDiario: number;

  constructor(private equipamentoService: EquipamentoService) {
  }


  getEquipamentos(reserva: ReservaModel): EquipamentoSalaModel[] {
    this.equipamentosSelecionados = [];
    this.reserva = reserva;
    this.equipamentos = [];
    reserva.equipamentos.forEach(element => {
      this.setEquipamentosById(element.idEquipamento, element);
    })
    return this.equipamentos;
  }

  private setEquipamentosById(id: number, reserva: ReservaEquipamento) {
    this.equipamentoService.getById(id).subscribe(
      (result: any) => {
        this.equipamento = result;
        this.equipamento.quantidade = reserva.quantidade;
        this.equipamentos.push(this.equipamento);
      },
      error => {
        console.log(error);
      }
    )
  }

  getReservaEquipamentos() {
    this.valorDiario = 0;
    for (let index = 0; index < this.equipamentosSelecionados.length; index++) {
      let reservaEquipamento = new ReservaEquipamento;
      reservaEquipamento.idEquipamento = this.equipamentosSelecionados[index].id;
      reservaEquipamento.quantidade = this.equipamentosSelecionados[index].quantidade;
      this.valorDiario += (this.equipamentosSelecionados[index].quantidade *
        this.equipamentosSelecionados[index].precoDiario);
      this.reservaEquipamentos.push(reservaEquipamento);
    }
    return this.reservaEquipamentos;
  }

  setEquipamentosSelecionados(equipamento: EquipamentoSalaModel) {
    this.equipamentosSelecionados.push(equipamento);
  }

  setReservaEquipamentos(reserva: ReservaModel) {
    this.reservaEquipamentos = [];
    reserva.equipamentos.forEach(element => {
      this.reservaEquipamentos.push(element);
    });
  }

}
