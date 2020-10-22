import { SalaEquipamentoService } from './../../shared/service/salaEquipamento.service';
import { SalaEquipamentoComponent } from './../sala-equipamento/sala-equipamento.component';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SalaService } from './../../shared/service/sala.service';
import { SalaModel, TipoSala } from './../../shared/model/sala.model';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, SelectItem, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  salas: SalaModel[] = [];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
  tiposSalas: SelectItem[];
  ref: DynamicDialogRef;

  sala: SalaModel = {
    id: null,
    descricao: null,
    capacidadePessoas: null,
    precoDiario: null,
    idTipoSala: null,
    equipamentos: null
  };

  constructor(private salaService: SalaService, private messageService: MessageService, 
    private confirmationService: ConfirmationService,public dialogService: DialogService,
    private salaEquipamentoService : SalaEquipamentoService) {
    
      this.tiposSalas =
      [
        { label: 'Tipo Sala: ', value: null },
        { label: 'sala de reunião', value: 1 },
        { label: 'sala de trabalho', value: 2 },
        { label: 'sala de video', value: 3 },
        { label: 'sala de palestras', value: 4 },
        { label: 'auditorio', value: 5 },
      ]
  }

  ngOnInit(): void {
    this.getAll();
    this.itens =
      [
        {
          label: "Novo",
          icon: "pi pi-desktop",
          command: () => this.showSaveDialog()
        }
      ]
  }

  show(sala: SalaModel){
    this.salaEquipamentoService.getEquipamentos(sala.equipamentos);
    const ref = this.dialogService.open(SalaEquipamentoComponent, {
      header: 'Equipamentos',
      width: '50%', 
      modal:false
  });
  }

  getAll() {
    this.salaService.getSalas().subscribe(
      (result: any) => {
        this.salas = result;
      },
      error => {
        console.log(error);
      }
    )
  }
  showSaveDialog(): void {
    throw new Error('Method not implemented.');
  }
  
  getTipoSala(id: number)
  {
    return TipoSala[id];
  }

  getTipoSalaNome(nome: string)
  {
    return TipoSala[nome];
  }

}