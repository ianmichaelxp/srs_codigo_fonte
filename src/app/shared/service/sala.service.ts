import { SalaModel } from './../model/sala.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  apiUrl: "localhost:8080/api/salas";

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getSalas(): Observable<SalaModel> {
    return this.httpClient.get<SalaModel>(this.apiUrl);
  }

}