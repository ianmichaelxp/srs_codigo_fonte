import { EquipamentoSalaModel } from './../model/equipamento.model';
import { EquipamentoService } from './equipamento.service';
import { SalaEquipamento, SalaModel } from './../model/sala.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SalaEquipamentoService {

  equipamentos: EquipamentoSalaModel[];
  sala : SalaModel;
  equipamentosSelecionados : EquipamentoSalaModel[] = [];
  salaEquipamentos : SalaEquipamento[] = [];
  equipamento : EquipamentoSalaModel;

  constructor(private equipamentoService: EquipamentoService) {
  }


  getEquipamentos(sala: SalaModel): EquipamentoSalaModel[] {
    this.equipamentosSelecionados = [];
    this.sala = sala;
    this.equipamentos = [];
    sala.equipamentos.forEach(element => {
      this.setEquipamentosById(element.idEquipamento, element);
    })
    return this.equipamentos;
  }

  private setEquipamentosById(id: number, sala : SalaEquipamento) 
  {
    this.equipamentoService.getById(id).subscribe(
      (result: any) => {
        this.equipamento = result;
        this.equipamento.quantidade = sala.quantidade;
        this.equipamentos.push(this.equipamento);
      },
      error => {
        console.log(error);
      }
    )
  }

  getSalaEquipamentos()
  {
    for (let index = 0; index < this.equipamentosSelecionados.length; index++) {
      let salaEquipamento = new SalaEquipamento;
      salaEquipamento.idEquipamento = this.equipamentosSelecionados[index].id;
      salaEquipamento.quantidade = this.equipamentosSelecionados[index].quantidade;
      this.salaEquipamentos.push(salaEquipamento);      
    }
    return this.salaEquipamentos;
  }

  setEquipamentosSelecionados(equipamento : EquipamentoSalaModel) 
  {
    this.equipamentosSelecionados.push(equipamento);
  }
}