import { ReservaClienteService } from './../../shared/service/reserva-cliente.service';
import { ClienteService } from './../../shared/service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/shared/model/cliente.model';

@Component({
  selector: 'app-reservas-cadastro-cliente',
  templateUrl: './reservas-cadastro-cliente.component.html',
  styleUrls: ['./reservas-cadastro-cliente.component.css']
})
export class ReservasCadastroClienteComponent implements OnInit {

  clientes: ClienteModel[] = [];
  cliente: ClienteModel = {
    id: null,
    nome: null,
    endereco: null,
    dataNasc: null,
    telefone: null,
    rg: null,
    cpf: null,
    email: null
  };
  cols: any[];


  constructor(private clienteService: ClienteService, private reservaClienteService : ReservaClienteService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.clienteService.getClientes().subscribe(
      (result: any) => {
        this.clientes = result;
      },
      error => {
        console.log(error);
      }
    )
  }

  selecionarCliente(cliente : ClienteModel)
  {
    this.reservaClienteService.setCliente(cliente.id);
  }
}
