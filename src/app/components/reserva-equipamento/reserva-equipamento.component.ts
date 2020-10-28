import { ReservaModel, ReservaEquipamento } from './../../shared/model/reserva.model';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { EquipamentoService } from 'src/app/shared/service/equipamento.service';
import { ReservaEquipamentoService } from 'src/app/shared/service/reserva-equipamento.service';
import { EquipamentoModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';

@Component({
  selector: 'app-reserva-equipamento',
  templateUrl: './reserva-equipamento.component.html',
  styleUrls: ['./reserva-equipamento.component.css']
})
export class ReservaEquipamentoComponent implements OnInit {

  
  tiposEquipamentos: SelectItem[];
  cols: any[];
  constructor(private equipamentoService: EquipamentoService, private reservaEquipamentoService: ReservaEquipamentoService) {
    this.tiposEquipamentos = equipamentoService.getTipoEquipamentos(this.tiposEquipamentos); 
  }

  equipamentosReserva: ReservaEquipamento[] = [];
  equipamentos : EquipamentoModel[] = [];

  ngOnInit(): void {
    this.equipamentosReserva = this.reservaEquipamentoService.reserva.equipamentos;
    this.equipamentosReserva.forEach(element => {
      this.equipamentoService.getById(element.idEquipamento).subscribe((result : EquipamentoModel) =>{
        this.equipamentos.push(result);
      });
    });
  }

  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }

  getQuantidade(id : number)
  {
    return this.equipamentosReserva.find(e => e.idEquipamento=== id).quantidade;
  }
}
