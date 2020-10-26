import { ClienteModel } from './../../shared/model/cliente.model';
import { ReservaSalaService } from './../../shared/service/reserva-sala.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva-cliente',
  templateUrl: './reserva-cliente.component.html',
  styleUrls: ['./reserva-cliente.component.css']
})
export class ReservaClienteComponent implements OnInit {

  constructor(private reservaSalaService : ReservaSalaService) { 
  }

  clientes : ClienteModel[] = [];
  cliente : ClienteModel = {
    id: null,
    nome: null,
    endereco: null,
    dataNasc: null,
    telefone: null,
    rg: null,
    cpf: null,
    email: null
  };
  cols : any[];
  
  ngOnInit(): void {  
    this.exibirClientes();
  }

  exibirClientes(){
    this.clientes = this.reservaSalaService.getCliente();
  }
}
