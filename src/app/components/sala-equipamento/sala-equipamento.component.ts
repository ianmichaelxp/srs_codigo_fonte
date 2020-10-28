import { SalaEquipamento } from './../../shared/model/sala.model';

import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
import { EquipamentoService } from 'src/app/shared/service/equipamento.service';
import { SalaEquipamentoService } from 'src/app/shared/service/salaEquipamento.service';

@Component({
  selector: 'app-sala-equipamento',
  templateUrl: './sala-equipamento.component.html',
  styleUrls: ['./sala-equipamento.component.css']
})
export class SalaEquipamentoComponent implements OnInit {
  
  tiposEquipamentos: SelectItem[];
  cols: any[];
  equipamentos: EquipamentoModel[] = [];
  quantidades : number[];
  salaEquipamentos : SalaEquipamento[];
  constructor(private equipamentoService: EquipamentoService, private salaEquipamentoService: SalaEquipamentoService) {
    this.tiposEquipamentos = equipamentoService.getTipoEquipamentos(this.tiposEquipamentos); 
  }

  ngOnInit(): void {
    this.salaEquipamentos = this.salaEquipamentoService.getSalaEquipamento();
    this.equipamentos = this.salaEquipamentoService.getAllEquipamentosOfSala();
  }

  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }

  getQuantidade(id : number)
  {
    return this.salaEquipamentos.find(s => s.idEquipamento === id).quantidade;
  }

}

