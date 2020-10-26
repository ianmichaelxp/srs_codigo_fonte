import { MessageService } from 'primeng/api';
import { SalaEquipamentoService } from './../../shared/service/salaEquipamento.service';
import { EquipamentoService } from './../../shared/service/equipamento.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoSalaModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';

@Component({
  selector: 'app-salas-cadastro',
  templateUrl: './salas-cadastro.component.html',
  styleUrls: ['./salas-cadastro.component.css']
})
export class SalasCadastroComponent implements OnInit {
  equipamentos: EquipamentoSalaModel[];
  tiposEquipamentos: SelectItem[];
  cols: any[];
  constructor(private equipamentoService: EquipamentoService, private salaEquipamentoService: SalaEquipamentoService,
    private messageService: MessageService) {
  }
  ngOnInit(): void {
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
  
  selecionarEquip(equipamento: EquipamentoSalaModel) {
    if(!this.hasErros(equipamento)){
      this.salaEquipamentoService.setEquipamentosSelecionados(equipamento);
    }
  }

  private hasErros(equipamento: EquipamentoSalaModel) : boolean {
    try {
      if (equipamento.quantidade == null)
        throw "quantidade Nula";
    } catch (err) {
      this.messageService.add({
        severity: 'error', summary: "Erro",
        detail: err  
      });
      return true;
    }
    return false;
  }

  removerEquip(equipamento: EquipamentoSalaModel) {
    this.salaEquipamentoService.removeEquipamentosSelecionados(equipamento);
  }
}
