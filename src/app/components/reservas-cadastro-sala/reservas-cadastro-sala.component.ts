import { Component, OnInit } from '@angular/core';
import { DialogService, SelectItem } from 'primeng';
import { SalaModel, TipoSala } from 'src/app/shared/model/sala.model';
import { ReservaSalaService } from 'src/app/shared/service/reserva-sala.service';
import { SalaService } from 'src/app/shared/service/sala.service';
import { SalaEquipamentoService } from 'src/app/shared/service/salaEquipamento.service';

@Component({
  selector: 'app-reservas-cadastro-sala',
  templateUrl: './reservas-cadastro-sala.component.html',
  styleUrls: ['./reservas-cadastro-sala.component.css']
})
export class ReservasCadastroSalaComponent implements OnInit {

  constructor(private reservaSalaService : ReservaSalaService,private salaService : SalaService, 
    private salaEquipamentoService: SalaEquipamentoService, private dialogService: DialogService) { 
      this.tiposSalas = salaService.getTipoSalas(this.tiposSalas);
    }

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
  ngOnInit(): void {
    this.salaService.getSalas().subscribe(
      (result : any) =>
      {
        this.salas = result;
      }
    );
  }

  getTipoSala(id: number) {
    return TipoSala[id];
  }

  selecionar(sala : SalaModel)
  {
    this.reservaSalaService.setIdSala(sala.id);
  }
}
