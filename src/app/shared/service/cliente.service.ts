import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteModel } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl:string = "http://localhost:8080/api/clientes";

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getClientes(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  public getById(id:number): Observable<ClienteModel>
  {
    return this.httpClient.get<ClienteModel>(this.apiUrl+"/"+id);
  }

  public save(cliente: ClienteModel): Observable<any> {
    return this.httpClient.post(this.apiUrl,JSON.stringify(cliente),this.httpOptions);
  }
  public delete(cliente: ClienteModel): Observable<any> {
      return this.httpClient.delete(this.apiUrl + '/' + cliente.id);
  }
  
  public edit(cliente: ClienteModel): Observable<any> {
    return this.httpClient.put(this.apiUrl,JSON.stringify(cliente), this.httpOptions);
  }

}
