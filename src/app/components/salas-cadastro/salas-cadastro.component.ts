import { SalaEquipamentoService } from './../../shared/service/salaEquipamento.service';
import { EquipamentoService } from './../../shared/service/equipamento.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoSalaModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
import { SalaEquipamento } from 'src/app/shared/model/sala.model';

@Component({
  selector: 'app-salas-cadastro',
  templateUrl: './salas-cadastro.component.html',
  styleUrls: ['./salas-cadastro.component.css']
})
export class SalasCadastroComponent implements OnInit 
{
  equipamentos: EquipamentoSalaModel[];
  tiposEquipamentos: SelectItem[];
  cols: any[];
  salaEquipamento : SalaEquipamento = {
    idSala: null,
    idEquipamento: null,
    quantidade: null
}
  constructor(private equipamentoService : EquipamentoService, private salaEquipamentoService: SalaEquipamentoService) 
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
  selecionarEquip(equipamento : EquipamentoSalaModel)
  {
    this.salaEquipamentoService.setEquipamentosSelecionados(equipamento);
    this.salaEquipamento = new SalaEquipamento;
  }
}
