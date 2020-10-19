import { EquipamentoModel } from './../model/equipamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  apiUrl:string = "http://localhost:8080/api/equipamentos/";

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpEquipamento: HttpClient
  ) { }

  public getEquipamentos(): Observable<any> {
    return this.httpEquipamento.get(this.apiUrl);
  }

  public save(equipamento: EquipamentoModel): Observable<any> {
    return this.httpEquipamento.post(this.apiUrl,JSON.stringify(equipamento),this.httpOptions);
  }

  public delete(equipamento: EquipamentoModel): Observable<any>
  {
    return this.httpEquipamento.delete(this.apiUrl+"/"+equipamento.id);
  }

  public edit(equipamento: EquipamentoModel): Observable<EquipamentoModel> {
    return this.httpEquipamento.put<EquipamentoModel>(this.apiUrl, JSON.stringify(equipamento), this.httpOptions);
  }
}
