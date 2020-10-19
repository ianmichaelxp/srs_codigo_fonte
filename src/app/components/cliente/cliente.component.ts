import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ClienteModel } from 'src/app/shared/model/cliente.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';

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
    private messageService: MessageService) { 

  }

  hideDialog(){
    this.displayEditDialog =false;
    this.displaySaveDialog = false;
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
        let cliente = result as ClienteModel;
        this.clientes.push(cliente);
        this.messageService.add({severity: 'success',
        summary:"Resultado",detail:"Cliente salvo com sucesso"});
        this.displaySaveDialog =false;
      },
      error=> {
        this.messageService.add({severity: 'error',summary:"Error",
        detail:"Cliente não pode ser adicionado, verifique os dados e tente novamente"})
      }
      )

  }
  edit(cliente: ClienteModel)
  {
    this.clienteService.edit(cliente).subscribe(
      ()=> {
        this.displayEditDialog = false;
        this.getAll();
        this.cliente = new ClienteModel;
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
  }
  showSaveDialog(){
    this.displaySaveDialog = true;
  }
}
