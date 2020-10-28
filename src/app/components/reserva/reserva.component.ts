import { ReservaClienteService } from './../../shared/service/reserva-cliente.service';
import { ReservasCadastroSalaComponent } from './../reservas-cadastro-sala/reservas-cadastro-sala.component';
import { ReservasCadastroClienteComponent } from './../reservas-cadastro-cliente/reservas-cadastro-cliente.component';
import { ReservasCadastroComponent } from './../reservas-cadastro/reservas-cadastro.component';
import { ReservaSalaService } from './../../shared/service/reserva-sala.service';
import { ReservaClienteComponent } from './../reserva-cliente/reserva-cliente.component';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, DialogService, DynamicDialogRef, MenuItem, MessageService } from 'primeng';
import { ClienteModel } from 'src/app/shared/model/cliente.model';
import { ReservaEquipamento, ReservaModel } from 'src/app/shared/model/reserva.model';
import { SalaModel } from 'src/app/shared/model/sala.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { ReservaEquipamentoService } from 'src/app/shared/service/reserva-equipamento.service';
import { ReservaService } from 'src/app/shared/service/reserva.service';
import { SalaService } from 'src/app/shared/service/sala.service';
import { ReservaEquipamentoComponent } from '../reserva-equipamento/reserva-equipamento.component';
import { ReservaSalaComponent } from '../reserva-sala/reserva-sala.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reservas: ReservaModel[] = [];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
  ref: DynamicDialogRef;
  cliente: ClienteModel = new ClienteModel;
  sala: SalaModel;
  reserva: ReservaModel = new ReservaModel;

  reservaEquipamento: ReservaEquipamento = {
    idReserva: null,
    idEquipamento: null,
    quantidade: null
  }
  constructor(private reservaService: ReservaService, private reservaEquipamentoService: ReservaEquipamentoService,
    private clienteService: ClienteService, private salaService: SalaService, public dialogService: DialogService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private reservaSalaService: ReservaSalaService, private reservaClienteService: ReservaClienteService) { }

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

  getSalaPorId(id: number) {

    this.salaService.getSalaPorId(id).subscribe(
      (result: any) => {
        this.sala = result;
      },
      error => {
        console.log(error);
      }
    );
    return this.sala;
  }

  getClientePorId(id: number) {
    this.clienteService.getById(id).subscribe(
      (result: any) => {
        this.cliente = result;
      },
      error => {
        console.log(error);
      }
    )
  }

  mostrarCliente(id: number) {
    this.reservaSalaService.setIdCliente(id);
    const ref = this.dialogService.open(ReservaClienteComponent, {
      header: "Cliente",
      width: '80%',
      modal: false
    });
  }

  mostrarSala(id: number) {
    this.reservaSalaService.calculaValorSala(id);
    const ref = this.dialogService.open(ReservaSalaComponent, {
      header: "Sala",
      width: '80%',
      modal: false
    })
  }

  getAll() {
    this.reservaService.getReservas().subscribe(
      (result: any) => {
        this.reservas = result;
      },
      error => {
        console.log(error);
      }
    )
  }

  delete(reserva: ReservaModel) {
    this.reservaService.delete(reserva).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: "Resultado", detail: "Reserva removida com sucesso"
        });
        this.getAll();
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error",
          detail: "Reserva não pode ser removida"
        })
      }
    )
  }

  confirm(reserva: ReservaModel) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esta reserva?',
      accept: () => {
        this.delete(reserva);
      },
      reject: () => {
        this.hideDialog();
      }
    });
  }

  hideDialog() {
    this.displayEditDialog = false;
    this.displaySaveDialog = false;
  }

  show(reserva: ReservaModel) {
    this.reservaEquipamentoService.setReserva(reserva);
    const ref = this.dialogService.open(ReservaEquipamentoComponent, {
      width: '80%',
      modal: false
    });
  }

  showSaveDialog() {
    this.reserva = new ReservaModel;
    this.displaySaveDialog = true;
  }


  showEditDialog(reserva: ReservaModel) {
    this.reserva = reserva;
    this.displayEditDialog = true;
    this.getAll();
  }

  save(reserva: ReservaModel) {
    this.setDadosReserva(reserva);
    reserva.precoFinal = this.calculaPrecoFinal(reserva);
    this.reservaEquipamentoService.equipamentosSelecionados = [];
    this.reservaService.save(reserva).subscribe(
      (result: any) => {
        this.reserva = new ReservaModel;
        this.messageService.add({
          severity: 'success',
          summary: "Resultado", detail: "Reserva salva com sucesso"
        });
        this.displaySaveDialog = false;
        this.getAll();
      }
    )
  }

  editar(reserva: ReservaModel) {
    reserva.precoFinal = this.reservaSalaService.calculaValorSala(reserva.idSala);
    reserva.equipamentos.forEach(element => {
      this.reservaEquipamentoService.setEquipamentosSelecionados(element);
    });
    reserva.equipamentos = this.reservaEquipamentoService.getReservaEquipamentos();
    reserva.precoFinal += this.reservaEquipamentoService.getSomaEquipamentos(reserva);
    reserva.precoFinal = this.calculaPrecoEditarReserva(reserva);
    this.reservaEquipamentoService.equipamentosSelecionados = [];
    this.reservaService.edit(reserva).subscribe(() => {
      this.displayEditDialog = false;
      this.reserva = new ReservaModel;
      this.messageService.add({
        severity: 'success',
        summary: "Resultado", detail: "Reserva editada com sucesso"
      });
      this.displayEditDialog = false;
      this.getAll();
    }
    )
  }

  private setDadosReserva(reserva: ReservaModel) {
    reserva.idCliente = this.reservaClienteService.getCliente();
    reserva.idSala = this.reservaSalaService.getIdSala();
    reserva.equipamentos = this.reservaEquipamentoService.getReservaEquipamentos();
  }

  private calculaPrecoFinal(reserva: ReservaModel) {
    reserva.precoFinal = this.reservaSalaService.calculaValorSala(reserva.idSala);
    reserva.equipamentos.forEach(element => {
      this.reservaEquipamentoService.setEquipamentosSelecionados(element);
    });
    reserva.equipamentos = this.reservaEquipamentoService.getReservaEquipamentos();
    reserva.precoFinal += this.reservaEquipamentoService.getSomaEquipamentos(reserva);
    reserva.precoFinal = this.calculaPrecoEditarReserva(reserva);
    let dateI = new Date(reserva.dataInicio);
    let dateF = new Date(reserva.dataFim);
    let tempo = Math.abs(dateI.getTime() - dateF.getTime());
    let dias = Math.ceil(tempo / (1000 * 60 * 60 * 24));
    reserva.precoFinal = this.reserva.precoFinal * dias;
    return reserva.precoFinal;
  }

  private calculaPrecoEditarReserva(reserva: ReservaModel)
  {
    let dateI = new Date(reserva.dataInicio);
    let dateF = new Date(reserva.dataFim);
    let tempo = Math.abs(dateI.getTime() - dateF.getTime());
    let dias = Math.ceil(tempo / (1000 * 60 * 60 * 24));
    reserva.precoFinal = reserva.precoFinal * dias;
    return reserva.precoFinal;
  }
  showClientes() {
    const ref = this.dialogService.open(ReservasCadastroClienteComponent, {
      width: '80%',
      modal: false
    });
  }

  showSalas() {
    const ref = this.dialogService.open(ReservasCadastroSalaComponent, {
      width: '80%',
      modal: false
    });
  }

  showEquipamentos() {
    const ref = this.dialogService.open(ReservasCadastroComponent, {
      width: '80%',
      modal: false
    });
  }
}
