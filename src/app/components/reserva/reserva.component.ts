import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteModel } from 'src/app/shared/model/cliente.model';
import { ReservaModel } from 'src/app/shared/model/reserva.model';
import { SalaEquipamento, SalaModel } from 'src/app/shared/model/sala.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { ReservaService } from 'src/app/shared/service/reserva.service';
import { ReservaEquipamentoService } from 'src/app/shared/service/reservaEquipamento.service';
import { SalaService } from 'src/app/shared/service/sala.service';
import { SalaEquipamentoService } from 'src/app/shared/service/salaEquipamento.service';
import { SalaEquipamentoComponent } from '../sala-equipamento/sala-equipamento.component';
import { SalasCadastroComponent } from '../salas-cadastro/salas-cadastro.component';
import { ReservasCadastroComponent } from './reserva-cadastro/reserva-cadastro.component';
import { ReservaEquipamentoComponent } from './reserva-equipamento/reserva-equipamento.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reservas: ReservaModel[] = [
  { 
    sala: {
      capacidadePessoas: 10,
      descricao: "ok",
      equipamentos:[],
      id:1,
      idTipoSala: 1,
      precoDiario: 200.00
    },
    cliente: {
      cpf: "12345678909",
      dataNasc: new Date(1990,10,2),
      email: "ian@email",
      endereco: "rua",
      id:1,
      nome:"Ian Michael",
      rg:"1234567",
      telefone:"33333333"


    },
    dataInicio:  new Date(2021,10,2),
	  dataFim: new Date(2021,11,12),
	  precoFinal: 500.00,
    equipamentos : [{
        idReserva:50,idEquipamento:1,quantidade:1
    }],
    idCliente: 1,
    idSala: 1
    
}];

  erro: any;
  itens: MenuItem[];
  rangeDates: Date[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
  ref: DynamicDialogRef;
  equipamentos: any[];


  salaEquipamento: SalaEquipamento = {
    idSala: null,
    idEquipamento: null,
    quantidade: null
  }

  reservaEquipamento: any = {
    idReserva: null,
    idEquipamento: null,
    quantidade: null
  }

  cliente: ClienteModel;
  sala: SalaModel;

  reserva: ReservaModel = {
    id: null,
    cliente: null,
    sala: null,
    dataInicio: null,
    dataFim: null,
    precoFinal: null,
    idCliente: null,
    idSala: null,
    equipamentos: null
  };
  
  constructor(private reservaService: ReservaService, 
    private clienteService: ClienteService, 
    private salaService: SalaService,
    private salaEquipamentoService: SalaEquipamentoService,
    private reservaEquipamentoService: ReservaEquipamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
    ) { }

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

  deleteWithButton(reserva: ReservaModel) {
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

  showEquipamentos() {
    const ref = this.dialogService.open(ReservasCadastroComponent, {
      width: '80%',
      modal: false
    });
  }

  showEquipamentosAdicionais(reserva: ReservaModel) {
    this.reservaEquipamentoService.getEquipamentos(reserva);    
    const ref = this.dialogService.open(ReservaEquipamentoComponent, {
      width: '80%',
      modal: false
    });
  }

  showEquipamentosObrigatorios(reserva: ReservaModel) {
    this.salaEquipamentoService.getEquipamentos(reserva.sala);    
    const ref = this.dialogService.open(SalaEquipamentoComponent, {
      width: '80%',
      modal: false
    });
  }


  getSalaPorId(id:number){
    let sala: SalaModel; 
    this.salaService.getSalaPorId(id).subscribe(
      (result:any) => {
        sala = result;
      },
      error => {
        console.log(error);
      }
    );
    return sala;
  }

  getClientePorId(id:number){
    let cliente: ClienteModel; 
    this.salaService.getSalaPorId(id).subscribe(
      (result:any) => {
        cliente = result;
      },
      error => {
        console.log(error);
      }
    );
    return cliente;
  }

  saveReserva(reserva: ReservaModel){

    this.getElementos(reserva);
    this.reservaService.save(reserva).subscribe((response: ReservaModel)=>{
              
        
        this.reservas.push(reserva);
        this.messageService.add({
          severity: 'success',
          summary: "Resultado", detail: "Reserva cadastrada com sucesso"
        });
        this.displaySaveDialog = false;
        this.getAll();
      });
      
    }

  getElementos(reserva: ReservaModel)
  {
    this.reserva.equipamentos = this.reservaEquipamentoService.getReservaEquipamentos();
    this.reserva.cliente = this.getClientePorId(reserva.idCliente);
    this.reserva.sala = this.getSalaPorId(reserva.idSala);
    return reserva;
  }


  getAll() 
  {
    this.reservaService
      .getReservas()
      .subscribe((reserva: any) => 
        {
          this.reservas = reserva;
        }, error => console.log(error));
  }


  editEquipWithButton() {
    this.reserva.equipamentos = this.reservaEquipamentoService.getReservaEquipamentos();
    this.salaService.edit(this.sala).subscribe(
      () => {
        this.displayEditDialog = false;
        this.reserva = new ReservaModel;
        this.messageService.add({
          severity: 'success',
          summary: "Resultado", detail: "Equipamento editado com sucesso"
        });
        this.getAll();
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error",
          detail: "Equipamento não pode ser editado, verifique os dados e tente novamente"
        })
      }
    )
  }

  showSaveDialog() 
  {
    this.reserva = new ReservaModel;
    this.displaySaveDialog = true;
  }

  showEditDialog(sala: ReservaModel) {
    this.displayEditDialog = true;
    this.reserva = this.reserva;
    this.getAll();
  }

}
