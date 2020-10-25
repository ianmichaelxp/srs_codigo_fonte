import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ClienteModel } from 'src/app/shared/model/cliente.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
  
})
export class ClienteComponent implements OnInit {

  clientes: ClienteModel[] = [{
    id: 1,
    nome: "null",
    endereco: "null",
    dataNasc: new Date(2014, 1, 1),
    telefone: "83999515180",
    rg: "1234567",
    cpf: "70062928406",
    email: "matheus@gmail.com"
  }
  ];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
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
  

  selectedCliente: ClienteModel ={
    id: null,
    nome: null,
    endereco: null,
    dataNasc: null,
    telefone: null,
    rg: null,
    cpf: null,
    email: null
  }

  constructor(private clienteService: ClienteService,
    private messageService: MessageService, private confirmationService: ConfirmationService
    ) { 

  }

  hideDialog(){
    this.displayEditDialog =false;
    this.displaySaveDialog = false;
  }

  confirm(cliente: ClienteModel) {
    this.confirmationService.confirm({
        message: 'Você tem certeza que deseja excluir este cliente?',
        accept: () => {
            this.delete(cliente);
        },
        reject: () => {
          this.hideDialog();
        }
    });
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
      icon:"pi pi-fw pi-plus",
      command: ()=> this.showSaveDialog()
      }
    ]
  }
  getAll(){
    this.clienteService.getClientes().subscribe(
      (result:any)=> {
        this.clientes = result;
      },
      error => {
        console.log(error);
      }
      
        ) 
  }

  removeMask(cliente:ClienteModel){
    let clienteNovo: ClienteModel =cliente;
    clienteNovo.cpf = cliente.cpf.replace('.','').replace('.','').replace('-','');
    clienteNovo.rg = cliente.rg.replace('.','').replace('.','');
    clienteNovo.telefone  = cliente.telefone.replace('(','').replace(')','').replace('-','');
    return clienteNovo;
  }
  
  save(){
    let cliente: ClienteModel = this.removeMask(this.cliente);
    this.clienteService.save(cliente).subscribe(
      (result:any)=>{
        this.clientes.push(result);
        this.messageService.add({severity: 'success',
        summary:"Resultado",detail:"Cliente salvo com sucesso"});
        this.hideDialog();
      },
      error=> {
        this.messageService.add({severity: 'error',summary:"Error",
        detail:"Cliente não pode ser adicionado, verifique os dados e tente novamente"})
      }
      )
      
  }
  edit(cliente: ClienteModel)
  {   let clienteNovo: ClienteModel = this.removeMask(cliente);
    this.clienteService.edit(clienteNovo).subscribe(
      ()=> {
        this.displayEditDialog = false;
        this.getAll();
        this.selectedCliente = new ClienteModel;
        this.messageService.add({severity: 'success',
        summary:"Resultado",detail:"Cliente editado com sucesso"});
      },
      error =>
      {
        console.log(error);
      }      
    )
  }

  delete(cliente:ClienteModel){
    this.clienteService.delete(cliente).subscribe(
      ()=>{
        this.getAll();
        this.messageService.add({severity: 'warn', 
        summary:'Resultado',detail:'Cliente removido'})
      },
      error=> {
        console.log(error);
      }
      
    )
    
  }

  showEditDialog(cliente: ClienteModel)
  {
    this.displayEditDialog = true;
    this.cliente = cliente;
    this.getAll();
  }
  showSaveDialog(){
    this.cliente = new ClienteModel;
    this.selectedCliente = new ClienteModel;
    this.displaySaveDialog = true;
  }
}