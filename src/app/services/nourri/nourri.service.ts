import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";
import {Nourri} from "../../models/Nourri.model";

@Injectable({
  providedIn: 'root'
})
export class NourriService {

  url : string;

  constructor(private httpClient : HttpClient,
              private authService : AuthService) {
    this.url = environment.apiUrl + "/nourri";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllNourri(){
    return this.httpClient.get<Array<Nourri>>(this.url);
  }

  updateNourri(id: number, unNourri: Nourri) {
    return this.httpClient.put(this.url + '/' + id, unNourri.serialize(), {headers: this.getHeader()});
  }

  createNourri(unNourri: Nourri) {
    return this.httpClient.post(this.url,unNourri.serialize(), {headers: this.getHeader()});
  }

  deleteNourriById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});

  }
}
