import { SalaService } from 'src/app/shared/service/sala.service';
import { element } from 'protractor';
import { EquipamentoService } from './equipamento.service';
import { SalaEquipamento, SalaModel } from '../model/sala.model';
import { Injectable } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { EquipamentoModel } from '../model/equipamento.model';


@Injectable({
  providedIn: 'root'
})
export class SalaEquipamentoService {
  sala :SalaModel;
  salaEquipamentos : SalaEquipamento[];
  equipamentos : EquipamentoModel[]; 
  equipamentosSelecionados : SalaEquipamento[] = [];
  constructor(private equipamentoService : EquipamentoService) { 
    this.getAllEquipamentos();
  }

  setSalaEquipamento(sala: SalaModel)
  {
    this.salaEquipamentos =sala.equipamentos;
  }

  getSalaEquipamento()
  {
    return this.salaEquipamentos;
  }

  getAllEquipamentos() : EquipamentoModel[]
  {
    this.equipamentoService.getEquipamentos().subscribe((result : EquipamentoModel[])=>{
      this.equipamentos = result;
    })
    return this.equipamentos;
  }

  getAllEquipamentosOfSala()
  {
    let equipamentosSel = [];
    this.salaEquipamentos.forEach(element => {
      equipamentosSel.push(this.equipamentos.find(e => e.id === element.idEquipamento));
    });
    return equipamentosSel;
  }

  getEquipamentosSelecionados()
  {
    return this.equipamentosSelecionados;
  }

  setEquipamentosSelecionados(salaEquipamento : SalaEquipamento)
  {
    this.equipamentosSelecionados.push(salaEquipamento);
  }
}