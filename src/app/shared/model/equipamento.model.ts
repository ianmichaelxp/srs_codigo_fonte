export class EquipamentoModel{
    id: number;
    nome:string;
    idTipoEquipamento: number;
    precoDiario: number;
}
export enum TipoEquipamento {
    "Móvel" = 1,
    "Eletrodoméstico",
    "Informática"
}
export class EquipamentoSalaModel extends EquipamentoModel{
    quantidade: number;
}

export class EquipamentoReservaModel extends EquipamentoModel {
    quantidade: number;
}

