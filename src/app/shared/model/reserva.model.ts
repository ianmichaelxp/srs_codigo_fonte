import { ReservaEquipamentoService } from '../service/reservaEquipamento.service';
import { ClienteModel } from './cliente.model';
import { EquipamentoReservaModel } from './equipamento.model';
import { SalaModel } from './sala.model';

export class ReservaModel{
    id?: number;
    dataInicio: Date;
    dataFim: Date;
    precoFinal: number;
    idCliente: number;
    cliente?: ClienteModel
    idSala: number;
    sala?: SalaModel
    equipamentos: ReservaEquipamento[];
}

export class ReservaEquipamento{
    idReserva: number;
    idEquipamento: number;
    quantidade: number;
}