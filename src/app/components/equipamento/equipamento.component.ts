import { ClienteService } from './../../shared/service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, SelectItem, ConfirmationService } from 'primeng/api';

import { EquipamentoService } from './../../shared/service/equipamento.service';
import { EquipamentoModel, TipoEquipamento } from './../../shared/model/equipamento.model';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css'],
})
export class EquipamentoComponent implements OnInit {
  equipamentos: EquipamentoModel[] = [];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
  tiposEquipamentos: SelectItem[];

  equipamento: EquipamentoModel = {
    id: null,
    nome: null,
    idTipoEquipamento: null,
    precoDiario: null
  };


  constructor(private equipamentoService: EquipamentoService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.tiposEquipamentos = equipamentoService.getTipoEquipamentos(this.tiposEquipamentos);
  }

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

  confirm(equipamento: EquipamentoModel) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este equipamento?',
      accept: () => {
        this.deleteEquipWithButton(equipamento);
      },
      reject: () => {
        this.displayEditDialog = false;
        this.displaySaveDialog = false;
      }
    });
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

  save() {
    if (!this.verifyErrors()) {
      this.equipamentoService.save(this.equipamento).subscribe(
        (result: any) => {
          this.displaySaveDialog = false;
          this.equipamento = new EquipamentoModel;

          let equipamento = result as EquipamentoModel;
          this.equipamentos.push(equipamento);
          this.messageService.add({
            severity: 'success',key: 'myKey1',
            summary: "Resultado", detail: "Equipamento salvo com sucesso"
          }),  
          this.displaySaveDialog = false;
          this.getAll();
        },
        error => {
          this.messageService.add({
            severity: 'error', summary: "Error",key: 'myKey1',
            detail: "Equipamento não pode ser salvo, verifique os dados e tente novamente"
          })
        }
      )
    }
  }
  showSaveDialog() {
    this.equipamento = new EquipamentoModel;
    this.displaySaveDialog = true;
  }

  showEditDialog(equipamento: EquipamentoModel) {
    this.displayEditDialog = true;
    this.equipamento = equipamento;
    this.getAll();
  }

  deleteEquipWithButton(equipamento: EquipamentoModel) {
    this.equipamentoService.delete(equipamento).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',key: 'myKey1',
          summary: "Resultado", detail: "Equipamento removido com sucesso"
        });
        this.getAll();
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error",key: 'myKey1',
          detail: "Equipamento não pode ser removido"
        })
      }
    )
  }
  editEquipWithButton() {
    if (!this.verifyErrors()) {
      this.equipamentoService.edit(this.equipamento).subscribe(
        () => {
          this.displayEditDialog = false;
          this.equipamento = new EquipamentoModel;
          this.messageService.add({
            severity: 'success',key: 'myKey1',
            summary: "Resultado", detail: "Equipamento editado com sucesso"
          });
          this.getAll();
        },
        error => {
          this.messageService.add({
            severity: 'error', summary: "Error",key: 'myKey1',
            detail: "Equipamento não pode ser editado, verifique os dados e tente novamente"
          })
        }
      )
    }
  }
  getTipoEquipamento(id: number) {
    return TipoEquipamento[id];
  }
  getTipoEquipamentoNome(nome: string) {
    return TipoEquipamento[nome];
  }

  verifyErrors(): boolean {
    try {
      if (this.equipamento.nome === undefined || this.equipamento.nome === null || this.equipamento.nome === "") throw "Nome vazio";
      if (this.equipamento.idTipoEquipamento == null) throw "Tipo nulo";
      if (this.equipamento.precoDiario == null) throw "Preço vazio";
    } catch (err) {
      this.messageService.add({
        severity: 'error', summary: "Erro",key: 'myKey1',
        detail: err
      });
      return true;
    }
    return false;
  }
}

