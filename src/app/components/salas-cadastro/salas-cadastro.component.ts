import { EquipamentoService } from './../../shared/service/equipamento.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoModel } from 'src/app/shared/model/equipamento.model';

@Component({
  selector: 'app-salas-cadastro',
  templateUrl: './salas-cadastro.component.html',
  styleUrls: ['./salas-cadastro.component.css']
})
export class SalasCadastroComponent implements OnInit 
{
  tiposEquipamentos: SelectItem[];
  cols: any[];
  equipamentos: EquipamentoModel[] = [];
  constructor(private equipamentoService : EquipamentoService) 
  {
    this.tiposEquipamentos = equipamentoService.getTipoEquipamentos(this.tiposEquipamentos);
  }
  ngOnInit(): void {
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
}
