export class SalaModel{
    id: number;
    descricao:string;
    capacidadePessoas:number;
    precoDiario: number;
    idTipoSala: number;
    equipamentos: SalaEquipamento[];
}

export enum TipoSala{
    "Sala de reunião"=1,
    "Sala de trabalho",
    "Sala de video",
    "Sala de palestras",
    "Auditorio"
}

export class SalaEquipamento{
    idSala: number;
    idEquipamento: number;
    quantidade: number;
}