export class EquipamentoModel{
    id: number;
    nome:string;
    idTipoEquipamento: number;
    precoDiario: number;
    tipoEquipamento: string;
    obrigatorio: string;
}

export enum TipoEquipamento {
    "Movel" = 1,
    "Eletrodomestico",
    "Informatica"
}

