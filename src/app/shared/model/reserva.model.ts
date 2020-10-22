export class ReservaModel{
    id: number;
    dataInicio: Date;
    dataFim: Date;
    precoFinal: number;
    idCliente: number;
    idSala: number;
    equipamentos: any[];
}