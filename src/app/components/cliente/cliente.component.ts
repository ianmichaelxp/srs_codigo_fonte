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

  clientes: ClienteModel[] = [];
  erro: any;
  dataAtual: Date = new Date();
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
    this.verifyErrors();
    let cliente: ClienteModel = this.removeMask(this.cliente);
    this.clienteService.save(cliente).subscribe(
      (result:any)=>{
        this.clientes.push(result);
        this.messageService.add({severity: 'success',key: 'myKey1',
        summary:"Resultado",detail:"Cliente salvo com sucesso"});
        this.hideDialog();
      },
      error=> {
        this.messageService.add({severity: 'error',summary:"Error",key: 'myKey1',
        detail:"Cliente não pode ser adicionado, verifique os dados e tente novamente"})
      }
      )
      
  }
  edit(cliente: ClienteModel)
  {   
    this.verifyErrors();
    let clienteNovo: ClienteModel = this.removeMask(cliente);
    this.clienteService.edit(clienteNovo).subscribe(
      ()=> {
        this.displayEditDialog = false;
        this.getAll();
        this.selectedCliente = new ClienteModel;
        this.messageService.add({severity: 'success',key: 'myKey1',
        summary:"Resultado",detail:"Cliente editado com sucesso"});
      },
      error=> {
        this.messageService.add({severity: 'error',summary:"Error",key: 'myKey1',
        detail:"Cliente não pode ser editado, verifique os dados e tente novamente"})
      }     
    )
  }

  delete(cliente:ClienteModel){
    this.clienteService.delete(cliente).subscribe(
      ()=>{
        this.getAll();
        this.messageService.add({severity: 'sucess',key: 'myKey1',
        summary:'Error',detail:'Cliente removido'})
      },
      error=> {
        this.messageService.add({severity: 'error',summary:"Error",key: 'myKey1',
        detail:"Cliente não pode ser removido pois está cadastrado em uma reserva"})
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
  verifyErrors(): boolean {
    try {
      if (this.cliente.nome === undefined || 
        this.cliente.nome === null || 
        this.cliente.nome === "" ) throw "Nome vazio";

        if (this.cliente.endereco === undefined || 
          this.cliente.endereco === null || 
          this.cliente.endereco === "") throw "Endereço vazio";
      
        if (this.cliente.cpf === null || this.cliente.cpf.length<11) throw "CPF invalido";
      
        if (this.cliente.rg == null || this.cliente.rg.length < 7) throw "Rg invalido";
        if (this.cliente.telefone == null || this.cliente.telefone.length < 11) throw "Telefone invalido";
        if (this.cliente.dataNasc == null || this.cliente.dataNasc > this.dataAtual) throw "Data invalida";
        if (this.cliente.email == null || this.cliente.email.search("@")==-1 ||
        this.cliente.email.search(".") == -1 || this.cliente.email =="" ) throw "Email invalido";
    } catch (err) {
      this.messageService.add({
        severity: 'error', summary: "Erro",
        detail: err,key: 'myKey1',
      });
      return true;
    }
    return false;
  }
}