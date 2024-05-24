import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Horaire} from "../../models/Horaire.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  url : string;
  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
    this.url = environment.apiUrl + '/horaire';
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllHoraires() {
    return this.httpClient.get<Array<Horaire>>(this.url);
  }

  createHoraire(event: Horaire) {
    return this.httpClient.post(this.url, event.serialize(), {headers: this.getHeader()});
  }

  deleteHoraireById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});
  }

  updateHoraire(id : number,value: Horaire) {
    return this.httpClient.put(this.url + '/' + id, value.serialize(), {headers: this.getHeader()});

  }
}
