import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ClienteModel } from 'src/app/shared/model/cliente.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: ClienteModel[] = [];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
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
  
  constructor(private clienteService: ClienteService) { 

  }

  ngOnInit():void
  { 
    this.getAll();
    this.cols = [
    {field:"id",header:"ID"},  
    {field:"nome",header:"NOME"},
    {field:"endereco",header:"ENDEREÇO"},
    {field:"dataNasc",header:"DATA DE NASCIMENTO"},
    {field:"telefone",header:"TELEFONE"},
    {field:"rg",header:"RG"},
    {field:"cpf",header:"CPF"},
    {field:"email",header:"EMAIL"}
  ]
    this.itens = [
      {label:"Novo",
      icon:"pi-user-plus",
      command: ()=> this.showSaveDialog()
      }
    ]
  }
  getAll(){
    this.clienteService.getClientes().subscribe(
      (result:any)=> {
        let clientes: ClienteModel[] = [];
        for(let i=0;i<result.length;i++){
          let cliente = result[i] as ClienteModel;
          clientes.push(cliente);
        }
        this.clientes = clientes;
      },
      error => {
        console.log(error);
      }
      
        ) 
  }
  save(){
    this.clienteService.save(this.cliente).subscribe(
      (result:any)=>{
        this.displaySaveDialog =false;
        this.getAll();
      },
      error=> {
        console.log(error);
      }
      )

  }

  showSaveDialog(){
    this.displaySaveDialog =true;

  }
 
}
