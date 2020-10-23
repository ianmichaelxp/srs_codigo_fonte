import { EquipamentoSalaModel } from './../model/equipamento.model';
import { EquipamentoService } from './equipamento.service';
import { SalaEquipamento } from './../model/sala.model';
import { Injectable } from '@angular/core';
import { EquipamentoModel } from '../model/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class SalaEquipamentoService {

  equipamentos: EquipamentoSalaModel[];
  equipamento: EquipamentoSalaModel = {
    id: null,
    nome: null,
    idTipoEquipamento: null,
    precoDiario: null,
    quantidade: null
  };
  equipamentosSelecionados : EquipamentoSalaModel[] = [];
  salaEquipamentos : SalaEquipamento[] = [];

  constructor(private equipamentoService: EquipamentoService) {
  }


  getEquipamentos(salaEquipamentos: SalaEquipamento[]): EquipamentoSalaModel[] {
    this.equipamentos = [];
    salaEquipamentos.forEach(element => {
      this.setEquipamentosById(element.idEquipamento);
      this.equipamento.quantidade = element.quantidade;
      this.equipamentos.push(this.equipamento);
    })
    return this.equipamentos;
  }

  setEquipamentosById(id: number) {
    this.equipamentoService.getById(id).subscribe(
      (result: any) => {
        this.equipamento = result
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
