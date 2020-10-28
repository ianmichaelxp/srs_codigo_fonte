import { Component, OnInit } from '@angular/core';
import { DialogService, SelectItem } from 'primeng';
import { SalaModel, TipoSala } from 'src/app/shared/model/sala.model';
import { ReservaSalaService } from 'src/app/shared/service/reserva-sala.service';
import { SalaService } from 'src/app/shared/service/sala.service';
import { SalaEquipamentoService } from 'src/app/shared/service/salaEquipamento.service';
import { SalaEquipamentoComponent } from '../sala-equipamento/sala-equipamento.component';

@Component({
  selector: 'app-reserva-sala',
  templateUrl: './reserva-sala.component.html',
  styleUrls: ['./reserva-sala.component.css']
})
export class ReservaSalaComponent implements OnInit {
  salas: SalaModel[] = [];
  tiposSalas: SelectItem[];
  sala: SalaModel = {
    id: null,
    descricao:null,
    capacidadePessoas:null,
    precoDiario: null,
    idTipoSala: null,
    equipamentos: null
  }
  cols: any[];

  constructor(private reservaSalaService : ReservaSalaService,private salaService : SalaService, 
    private salaEquipamentoService: SalaEquipamentoService, private dialogService: DialogService) { 
    this.tiposSalas = salaService.getTipoSalas(this.tiposSalas);
  }

  ngOnInit(): void {
    this.salas = this.reservaSalaService.getSala();
  }
  getTipoSala(id: number) {
    return TipoSala[id];
  }
    show(sala: SalaModel) {
    this.salaEquipamentoService.setSalaEquipamento(sala);
    const ref = this.dialogService.open(SalaEquipamentoComponent, {
      width: '80%',
      modal: false
    });
  }
}
