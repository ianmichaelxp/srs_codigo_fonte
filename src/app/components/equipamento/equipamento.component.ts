import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { EquipamentoService } from './../../shared/service/equipamento.service';
import { EquipamentoModel, TipoEquipamento} from './../../shared/model/equipamento.model';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

  equipamentos: EquipamentoModel[] = [];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
  equipamentoSelecionados : EquipamentoModel;
  equipamentoEditado: EquipamentoModel;

  tiposEquipamentos: SelectItem[];
  tipoObrigatorio: SelectItem[];

  equipamento: EquipamentoModel = {
    id: null,
    nome: null,
    idTipoEquipamento: null,
    precoDiario: null,
    tipoEquipamento: null,
    obrigatorio: null
  };
 
  
  constructor(private equipamentoService: EquipamentoService, private messageService: MessageService) { 
    this.tiposEquipamentos = 
    [
      {label:'Tipo Equipamento: ', value:null},
      {label:'Movel', value: 1},
      {label:'Eletrodomesticos', value:2},
      {label:'Informatica', value: 3},
    ]
  }

  ngOnInit():void
  { 
    this.getAll();
    this.cols = 
    [
    {field:"id", header: "Id"},
    {field:"nome",header:"Nome"},  
    {field:"precoDiario",header:"Preço Diário"},
    {field:"tipoEquipamento", header:"Tipo equipamento"}
    
    ]
    this.itens = [
      {label:"Novo",
      icon:"pi pi-desktop",
      command: ()=> this.showSaveDialog()
      }
    ]
  }
  getAll(){
    this.equipamentoService.getEquipamentos().subscribe(
      (result:any)=> {
        let equipamentos: EquipamentoModel[] = [];
        for(let i=0;i<result.length;i++){
          let equipamento = result[i] as EquipamentoModel; 
          equipamento.tipoEquipamento = TipoEquipamento[equipamento.idTipoEquipamento];
          equipamentos.push(equipamento);
        }
        this.equipamentos = equipamentos;
      },
      error => {
        console.log(error);
      }
    ) 
  }

  save(){
    this.equipamentoService.save(this.equipamento).subscribe(
      (result:any)=>{
        this.displaySaveDialog =false;
        this.equipamento = new EquipamentoModel;

        let equipamento = result as EquipamentoModel;
        this.equipamentos.push(equipamento);
        this.messageService.add({severity: 'success',
        summary:"Resultado",detail:"Equipamento salvo com sucesso"});
        this.displaySaveDialog =false;
      },
      error=> {
        this.messageService.add({severity: 'error',summary:"Error",
        detail:"Cliente não pode ser adicionado, verifique os dados e tente novamente"})
      }
      )

  }
  showSaveDialog(){
    this.equipamento = new EquipamentoModel;
    this.displaySaveDialog =true;
  }

  showEditDialog(equipamento: EquipamentoModel)
  {
    this.displayEditDialog = true;
    this.equipamento = equipamento;
    this.getAll();
  }

  deleteEquipWithButton(equipamento: EquipamentoModel) {
    this.equipamentoService.delete(equipamento).subscribe(
      () => {
        this.messageService.add({severity: 'success',
        summary:"Resultado",detail:"Equipamento removido com sucesso"});
        this.getAll();
      },  
      error =>
      {
        this.messageService.add({severity: 'error',summary:"Error",
        detail:"Equipamento não pode ser removido, verifique os dados e tente novamente"})
      }     
    )
  }
  editEquipWithButton()
  {
    this.equipamentoService.edit(this.equipamento).subscribe(
      ()=> {
        this.displayEditDialog = false;
        this.equipamento = new EquipamentoModel;
        this.messageService.add({severity: 'success',
        summary:"Resultado",detail:"Equipamento editado com sucesso"});
        this.getAll();
      },
      error =>
      {
        this.messageService.add({severity: 'error',summary:"Error",
        detail:"Equipamento não pode ser editado, verifique os dados e tente novamente"})
      }      
    )
  }
}

