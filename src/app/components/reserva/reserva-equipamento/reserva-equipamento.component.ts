import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { EquipamentoService } from 'src/app/shared/service/equipamento.service';
import { EquipamentoReservaModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
import { ReservaEquipamentoService } from 'src/app/shared/service/reservaEquipamento.service';

@Component({
  selector: 'app-reserva-equipamento',
  templateUrl: './reserva-equipamento.component.html'
})
export class ReservaEquipamentoComponent implements OnInit {

  equipamentos: EquipamentoReservaModel[];
  quantidade : number[];
  tiposEquipamentos: SelectItem[];
  cols: any[];
  constructor(
    private equipamentoService: EquipamentoService, 
    private reservaEquipamentoService: ReservaEquipamentoService) 
    {
      this.tiposEquipamentos = equipamentoService
        .getTipoEquipamentos(this.tiposEquipamentos); 
    }


  ngOnInit(): void {
    this.equipamentos = this.reservaEquipamentoService.equipamentos;
  }

  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }
}