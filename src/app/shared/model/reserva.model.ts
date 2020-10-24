export class ReservaModel{
    id: number;
    dataInicio: Date;
    dataFim: Date;
    precoFinal: number;
    equipamentos: ReservaEquipamento[];
    idCliente: number;
    idSala: number;
}

export class ReservaEquipamento{
    idReserva: number;
    idEquipamento: number;
    quantidade: number;
}