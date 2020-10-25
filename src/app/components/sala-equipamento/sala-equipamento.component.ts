
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoSalaModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
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
  equipamentos: EquipamentoSalaModel[];
  quantidades : number[];
  constructor(private equipamentoService: EquipamentoService, private salaEquipamentoService: SalaEquipamentoService) {
    this.tiposEquipamentos = equipamentoService.getTipoEquipamentos(this.tiposEquipamentos); 
  }

  ngOnInit(): void {
    this.equipamentos = this.salaEquipamentoService.equipamentos;
  }

  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }
}

