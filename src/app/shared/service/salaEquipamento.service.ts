import { EquipamentoService } from './equipamento.service';
import { SalaEquipamento } from './../model/sala.model';
import { Injectable } from '@angular/core';
import { EquipamentoModel } from '../model/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class SalaEquipamentoService {

    equipamentos : EquipamentoModel[] = [];
  constructor(private equipamentoService: EquipamentoService) { }


  getEquipamentos(salaEquipamentos : SalaEquipamento[])
  {
    this.equipamentos = [];
    for (let index = 0; index < salaEquipamentos.length; index++) {
      this.setEquipamentosById(salaEquipamentos[index].idEquipamento);
    }
    return this.equipamentos;
  }


  private setEquipamentosById(id: number) 
  {
    this.equipamentoService.getById(id).subscribe(
      (result: any) => {
        this.equipamentos.push(result);
      },
      error => {
        console.log(error);
      }
    )
  }
}
