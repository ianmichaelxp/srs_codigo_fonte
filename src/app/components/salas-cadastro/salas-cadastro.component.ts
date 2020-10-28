import { element } from 'protractor';
import { SalaService } from 'src/app/shared/service/sala.service';
import { MessageService } from 'primeng/api';
import { SalaEquipamentoService } from './../../shared/service/salaEquipamento.service';
import { EquipamentoService } from './../../shared/service/equipamento.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
import { SalaEquipamento, SalaModel } from 'src/app/shared/model/sala.model';

@Component({
  selector: 'app-salas-cadastro',
  templateUrl: './salas-cadastro.component.html',
  styleUrls: ['./salas-cadastro.component.css']
})
export class SalasCadastroComponent implements OnInit {
  equipamentos: EquipamentoModel[];
  tiposEquipamentos: SelectItem[];
  salaEquipamentos: SalaEquipamento[];
  salas: SalaEquipamento[];
  cols: any[];
  quantidade : number;
  constructor(private equipamentoService: EquipamentoService, private salaEquipamentoService: SalaEquipamentoService,
    private messageService: MessageService, private salaService: SalaService) {
  }
  ngOnInit(): void {
    this.salaEquipamentos = this.salaEquipamentoService.getSalaEquipamento();
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

  selecionarEquip(equipamento : EquipamentoModel)
  {
    let salaEquipamento = new SalaEquipamento;
    salaEquipamento.quantidade = this.quantidade;
    this.quantidade = null;
    salaEquipamento.idEquipamento = equipamento.id;
    this.salaEquipamentoService.setEquipamentosSelecionados(salaEquipamento);
  }
}

