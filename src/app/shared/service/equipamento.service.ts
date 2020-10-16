import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipamentoModel } from '../model/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  apiUrl: "localhost:8080/api/equipamentos";

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getEquipamentos(): Observable<EquipamentoModel> {
    return this.httpClient.get<EquipamentoModel>(this.apiUrl);
  }
}
