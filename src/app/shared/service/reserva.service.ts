import { ReservaModel } from './../model/reserva.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  apiUrl: "localhost:8080/api/reservas";

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getReservas(): Observable<ReservaModel> {
    return this.httpClient.get<ReservaModel>(this.apiUrl);
  }
  public getReservaPorId(id:number): Observable<any>{
    return this.httpClient.get(this.apiUrl+ '/' + id);
  }

  public save(reserva: ReservaModel): Observable<any> {
    return this.httpClient.post(this.apiUrl,JSON.stringify(reserva),this.httpOptions);
  }
  public delete(reserva: ReservaModel): Observable<any> {
      return this.httpClient.delete(this.apiUrl + '/' + reserva.id);
  }
  
  public edit(reserva: ReservaModel): Observable<any> {
    return this.httpClient.put(this.apiUrl,JSON.stringify(reserva), this.httpOptions);
  }
}
