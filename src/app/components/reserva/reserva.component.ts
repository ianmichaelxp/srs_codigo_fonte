import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, MenuItem, SelectItem } from 'primeng';
import { ClienteModel } from 'src/app/shared/model/cliente.model';
import { ReservaModel } from 'src/app/shared/model/reserva.model';
import { SalaModel } from 'src/app/shared/model/sala.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { ReservaService } from 'src/app/shared/service/reserva.service';
import { SalaService } from 'src/app/shared/service/sala.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reservas: ReservaModel[] = [];
  erro: any;
  itens: MenuItem[];
  cols: any[];
  displaySaveDialog: boolean = false;
  displayEditDialog: boolean = false;
  tiposSalas: SelectItem[];
  ref: DynamicDialogRef;

  reserva: ReservaModel = {
    id: null,
    dataInicio: null,
    dataFim: null,
    precoFinal: null,
    idCliente: null,
    idSala: null,
    equipamentos: null
  };
  constructor(private reservaService: ReservaService, 
    private clienteService: ClienteService, private salaService: SalaService) { }

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

  getAll() {
    this.reservaService.getReservas().subscribe(
      (result: any) => {
        this.reservas = result;
      },
      error => {
        console.log(error);
      }
    )
  }
  showSaveDialog() {
    this.reserva = new ReservaModel;
    this.displaySaveDialog = true;
  }

}
