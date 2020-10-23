import { EquipamentoModel } from './../model/equipamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng';

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
  equipamentoService: SelectItem[];

  constructor(
    private httpEquipamento: HttpClient
  ) { }

  public getEquipamentos(): Observable<any> {
    return this.httpEquipamento.get(this.apiUrl);
  }

  public getById(id: number): Observable<EquipamentoModel>
  {
    return this.httpEquipamento.get<EquipamentoModel>(this.apiUrl+"/"+id);
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

  public getTipoEquipamentos(tiposEquipamentos: SelectItem[]){
    tiposEquipamentos =
      [
        { label: 'Tipo Equipamento: ', value: null },
        { label: 'Móvel', value: 1 },
        { label: 'Eletrodomésticos', value: 2 },
        { label: 'Informática', value: 3 },
      ]
      return tiposEquipamentos;
  }
}
