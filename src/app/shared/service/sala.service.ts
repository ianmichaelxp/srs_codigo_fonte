import { SalaModel } from './../model/sala.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  apiUrl = "http://localhost:8080/api/salas";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpSalas: HttpClient
  ) { }

  public getSalas(): Observable<any> {
    return this.httpSalas.get(this.apiUrl);
  }

  public getSalaPorId(id: number): Observable<any>
  {
    return this.httpSalas.get(this.apiUrl+"/"+id);
  }

  public save(sala: SalaModel): Observable<any> {
    return this.httpSalas.post(this.apiUrl, JSON.stringify(sala), this.httpOptions);
  }

  public delete(sala: SalaModel): Observable<any> {
    return this.httpSalas.delete(this.apiUrl + "/" + sala.id);
  }

  public edit(sala: SalaModel): Observable<SalaModel> {
    return this.httpSalas.put<SalaModel>(this.apiUrl+"/"+sala.id, JSON.stringify(sala), this.httpOptions);
  }

  public getTipoSalas(tiposSalas: SelectItem[]){
    tiposSalas =
      [
        { label: 'Tipo Sala: ', value: null },
        { label: 'Sala de reunião', value: 1 },
        { label: 'Sala de trabalho', value: 2 },
        { label: 'Sala de video', value: 3 },
        { label: 'Sala de palestras', value: 4 },
        { label: 'Auditório', value: 5 }
      ]
      return tiposSalas;
  }

  public getEquipamentoSala()
  {
    this.getSalas().subscribe(
      (result: SalaModel[])=>{
        let equipamentosSalas = []
        result.forEach(element => {
           equipamentosSalas.push(element.equipamentos);
        });
      }
    )
  }
}
