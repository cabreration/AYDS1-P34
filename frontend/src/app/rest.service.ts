import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpAddress = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  PostRequest(serverAddress: string, info: object) {
    console.log(serverAddress);
    return this.httpClient.post<any>(httpAddress + serverAddress, info, httpOptions);
  }

  GetRequest(serverAddress: string) {
    console.log(serverAddress);
    return this.httpClient.get<any>(httpAddress + serverAddress, httpOptions);
  }
}
