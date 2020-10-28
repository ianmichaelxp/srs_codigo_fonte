import { EquipamentoService } from './../../shared/service/equipamento.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
import { ReservaEquipamento } from 'src/app/shared/model/reserva.model';
import { ReservaEquipamentoService } from 'src/app/shared/service/reserva-equipamento.service';

@Component({
  selector: 'app-reservas-cadastro',
  templateUrl: './reservas-cadastro.component.html',
  styleUrls: ['./reservas-cadastro.component.css']
})
export class ReservasCadastroComponent implements OnInit {

  equipamentos: EquipamentoModel[];
  tiposEquipamentos: SelectItem[];
  cols: any[];
  quantidade : number;
  constructor(private equipamentoService : EquipamentoService, 
    private reservaEquipamentoService: ReservaEquipamentoService) 
  {
  }
  ngOnInit(): void 
  {
    this.tiposEquipamentos = this.equipamentoService.getTipoEquipamentos(this.tiposEquipamentos);
    this.getAll();
  }
  getAll() {
    this.equipamentoService.getEquipamentos().subscribe(
      (result: any) => {
        this.equipamentos = result;
      },
      error => {
        console.log(error);
      }
    )
  }
  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }
  getTipoEquipamentoNome(nome: string) {
    return TipoEquipamento[nome];
  }
  selecionarEquip(equipamento : EquipamentoModel)
  {
    let reservaEquipamento = new ReservaEquipamento;
    reservaEquipamento.quantidade = this.quantidade;
    this.quantidade = null;
    reservaEquipamento.idEquipamento = equipamento.id;
    this.reservaEquipamentoService.setEquipamentosSelecionados(reservaEquipamento);
  }
}
