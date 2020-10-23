import { SalasCadastroComponent } from './../salas-cadastro/salas-cadastro.component';
import { SalaEquipamentoService } from './../../shared/service/salaEquipamento.service';
import { SalaEquipamentoComponent } from './../sala-equipamento/sala-equipamento.component';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SalaService } from './../../shared/service/sala.service';
import { SalaEquipamento, SalaModel, TipoSala } from './../../shared/model/sala.model';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import { EquipamentoComponent } from '../equipamento/equipamento.component';

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

  salaEquipamento: SalaEquipamento = {
    idSala: null,
    idEquipamento: null,
    quantidade: null
  }

  sala: SalaModel = {
    id: null,
    descricao: null,
    capacidadePessoas: null,
    precoDiario: null,
    idTipoSala: null,
    equipamentos: null
  };

  

  ngOnInit(): void {
    this.getAll();
    this.itens =
      [
        {
          label: "Novo",
          icon: "pi pi-plus",
          command: () => this.showSaveDialog()
        }
      ]
  }

  constructor(private salaService: SalaService, private messageService: MessageService,
    private confirmationService: ConfirmationService, public dialogService: DialogService,
    private salaEquipamentoService: SalaEquipamentoService) {

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

  confirm(sala: SalaModel) {
    this.deleteWithButton(sala);
  }
  deleteWithButton(sala: SalaModel) {
    this.salaService.delete(sala).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: "Resultado", detail: "Sala removida com sucesso"
        });
        this.getAll();
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error",
          detail: "Sala não pode ser removida"
        })
      }
    )
  }
  showEquipamentos() {
    const ref = this.dialogService.open(SalasCadastroComponent, {
      width: '80%',
      modal: false
    });
  }

  show(sala: SalaModel) {
    this.salaEquipamentoService.getEquipamentos(sala);
    const ref = this.dialogService.open(SalaEquipamentoComponent, {
      width: '80%',
      modal: false
    });
  }

  getSalaEquipamentoDialog()
  {
    
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

  save() {
    this.sala.equipamentos = this.salaEquipamentoService.getSalaEquipamentos();
    this.salaService.save(this.sala).subscribe(
      (result: any) => {
        this.sala = new SalaModel;
        this.messageService.add({
          severity: 'success',
          summary: "Resultado", detail: "Sala salva com sucesso"
        });
        this.displaySaveDialog = false;
        this.getAll();
      }
    )
  }

  getTipoSala(id: number) {
    return TipoSala[id];
  }

  getTipoSalaNome(nome: string) {
    return TipoSala[nome];
  }

  showSaveDialog() {
    this.sala = new SalaModel;
    this.displaySaveDialog = true;
  }

  showEditDialog(sala: SalaModel) {
  }
}