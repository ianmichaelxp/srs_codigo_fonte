import { ClienteModel } from './../model/cliente.model';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ReservaClienteService {

    private idCliente: number;
    constructor() {
    }

    setCliente(idCliente: number) {
        this.idCliente = idCliente;
    }

    getCliente() {
        return this.idCliente;
    }

}