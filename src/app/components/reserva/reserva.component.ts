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
  cliente :ClienteModel;
  sala: SalaModel;
  reserva: ReservaModel = {
    id: null,
    dataInicio: null,
    dataFim: null,
    precoFinal: null,
    equipamentos: null,
    idCliente: null,
    idSala: null
  };

  reservaEquipamento: ReservaEquipamento = {
    idReserva: null,
    idEquipamento: null,
    quantidade: null
  }
  constructor(private reservaService: ReservaService, private reservaEquipamentoService: ReservaEquipamentoService,
    private clienteService: ClienteService, private salaService: SalaService, public dialogService: DialogService,
    private messageService: MessageService,private confirmationService: ConfirmationService) { }

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

  getSalaPorId(id:number){
    
    this.salaService.getSalaPorId(id).subscribe(
      (result:any) => {
        this.sala = result;
      },
      error => {
        console.log(error);
      }
    );
    return this.sala;
  }

  getClientePorId(id:number){
    this.clienteService.getClientePorId(id).subscribe(
      (result:any) => {
        this.cliente = result;
      },
      error => {
        console.log(error);
      }
    );
    return this.cliente;
  }
  getNomeCliente(id:number){
    let cliente = this.getClientePorId(id);
    let nome: string = cliente.nome;
    return nome;
  }
  getDescricaoSala(id:number){
    let sala = this.getSalaPorId(id);
    let descricao: string = sala.descricao;
    return descricao;
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

  confirm(reserva : ReservaModel) {
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

  hideDialog(){
    this.displayEditDialog =false;
    this.displaySaveDialog = false;
  }

  show(reserva: ReservaModel) {
    this.reservaEquipamentoService.getEquipamentos(reserva);
    const ref = this.dialogService.open(ReservaEquipamentoComponent, {
      width: '80%',
      modal: false
    });
  }
  
  showSaveDialog() {
    this.reserva = new ReservaModel;
    this.displaySaveDialog = true;
  }

}
