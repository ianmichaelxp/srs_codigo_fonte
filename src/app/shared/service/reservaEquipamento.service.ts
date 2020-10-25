import { Injectable } from '@angular/core';
import { EquipamentoReservaModel, EquipamentoSalaModel } from '../model/equipamento.model';
import { ReservaEquipamento, ReservaModel } from '../model/reserva.model';
import { EquipamentoService } from './equipamento.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaEquipamentoService {

  equipamentos: EquipamentoReservaModel[];
  reserva : ReservaModel;
  equipamentosSelecionados : EquipamentoReservaModel[] = [];
  reservaEquipamentos : ReservaEquipamento[] = [];
  equipamento : EquipamentoReservaModel;

  constructor(private equipamentoService: EquipamentoService) {
  }


  getEquipamentos(reserva: ReservaModel): EquipamentoReservaModel[] {
    this.equipamentosSelecionados = [];
    this.reserva = reserva;
    this.equipamentos = [];
    reserva.equipamentos.forEach(element => {
      this.setEquipamentosById(element.idEquipamento, element);
    })
    return this.equipamentos;
  }

  private setEquipamentosById(id: number, reserva : ReservaEquipamento) 
  {
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

  getReservaEquipamentos()
  {
    this.reservaEquipamentos = [];
    for (let index = 0; index < this.equipamentosSelecionados.length; index++) {
      let reservaEquipamento = new ReservaEquipamento;
      reservaEquipamento.idEquipamento = this.equipamentosSelecionados[index].id;
      reservaEquipamento.quantidade = this.equipamentosSelecionados[index].quantidade;
      this.reservaEquipamentos.push(reservaEquipamento);      
    }
    return this.reservaEquipamentos;
  }

  setEquipamentosSelecionados(equipamento : EquipamentoReservaModel) 
  {
    this.equipamentosSelecionados.push(equipamento);
  }
}