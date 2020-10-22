import { SalaEquipamentoService } from './../../shared/service/salaEquipamento.service';
import { EquipamentoService } from './../../shared/service/equipamento.service';
import { EquipamentoModel, TipoEquipamento } from './../../shared/model/equipamento.model';
import { Component, OnInit, Output } from '@angular/core';
import { SalaEquipamento } from 'src/app/shared/model/sala.model';

@Component({
  selector: 'app-sala-equipamento',
  templateUrl: './sala-equipamento.component.html',
  styleUrls: ['./sala-equipamento.component.css']
})
export class SalaEquipamentoComponent implements OnInit {
  

  constructor(private equipamentoService: EquipamentoService, private salaEquipamentoService: SalaEquipamentoService) { }

  equipamentos: EquipamentoModel[];

  ngOnInit(): void {
    this.equipamentos = this.salaEquipamentoService.equipamentos;
  }

  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }
}

