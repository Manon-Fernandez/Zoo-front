import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Service} from "../../models/Service.model";
import {Sante} from "../../models/Sante";

@Injectable({
  providedIn: 'root'
})
export class SanteService {

  url: string;

  constructor(private httpClient : HttpClient,
              private authService : AuthService){
    this.url = environment.apiUrl + "/sante";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllSante() {
    return this.httpClient.get<Array<Sante>>(this.url);
  }

  updateSante(id: number, unSante: Sante) {
    return this.httpClient.put(this.url + '/' + id, unSante.serialize(), {headers: this.getHeader()});
  }

  createSante(unSante: Sante) {
    return this.httpClient.post(this.url,unSante.serialize(), {headers: this.getHeader()});
  }

  deleteSanteById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});
  }

}
