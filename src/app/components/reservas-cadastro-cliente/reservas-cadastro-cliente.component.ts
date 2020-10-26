import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/shared/model/cliente.model';

@Component({
  selector: 'app-reservas-cadastro-cliente',
  templateUrl: './reservas-cadastro-cliente.component.html',
  styleUrls: ['./reservas-cadastro-cliente.component.css']
})
export class ReservasCadastroClienteComponent implements OnInit {

  cliente: ClienteModel;
  cols: any;
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
