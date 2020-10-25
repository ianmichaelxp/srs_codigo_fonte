import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EquipamentoSalaModel, TipoEquipamento } from 'src/app/shared/model/equipamento.model';
import { ReservaEquipamento } from 'src/app/shared/model/reserva.model';
import { EquipamentoService } from 'src/app/shared/service/equipamento.service';
import { ReservaEquipamentoService } from 'src/app/shared/service/reservaEquipamento.service';

@Component({
  selector: 'app-reservas-cadastro',
  templateUrl: './reserva-cadastro.component.html'
})
export class ReservasCadastroComponent implements OnInit {

  equipamentos: EquipamentoSalaModel[];
  tiposEquipamentos: SelectItem[];
  cols: any[];
  reservaEquipamento : ReservaEquipamento = {
    idReserva: null,
    idEquipamento: null,
    quantidade: null
}
  constructor(private equipamentoService : EquipamentoService, 
    private reservaEquipamentoService: ReservaEquipamentoService) 
  { }

  ngOnInit(): void 
  {
    this.tiposEquipamentos = this.equipamentoService
      .getTipoEquipamentos(this.tiposEquipamentos);

    this.getAll();
  }

  getAll() 
  {
    this.equipamentoService
      .getEquipamentos()
      .subscribe((result: any) => 
        {
          this.equipamentos = result;
        },
        error => console.log(error)
      )
  }

  getTipoEquipamento(id: number) 
  {
    return TipoEquipamento[id];
  }

  getTipoEquipamentoNome(nome: string) 
  {
    return TipoEquipamento[nome];
  }

  selecionarEquip(equipamento : EquipamentoSalaModel)
  {
    this.reservaEquipamentoService.setEquipamentosSelecionados(equipamento);
    this.reservaEquipamento = new ReservaEquipamento;
  }
}