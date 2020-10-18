import { EquipamentoService } from './../../shared/service/equipamento.service';
import { EquipamentoModel, TipoEquipamento} from './../../shared/model/equipamento.model';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {SelectItem} from 'primeng/api';

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
 
  
  constructor(private equipamentoService: EquipamentoService) { 
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
        this.getAll();
        this.displaySaveDialog =false;
        this.equipamento = new EquipamentoModel;
      },
      error=> {
        console.log(error);
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
        this.getAll();
      },  
      error =>
      {
        console.log(error);
      }      
    )
  }
  editEquipWithButton()
  {
    this.equipamentoService.edit(this.equipamento).subscribe(
      ()=> {
        this.getAll();
        this.displayEditDialog = false;
        this.equipamento = new EquipamentoModel;
      },
      error =>
      {
        console.log(error);
      }      
    )
  }
}

