import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";
import {UtilisateurDTO} from "../../models/Utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  url: string;
  constructor(private httpClient : HttpClient,
              private authService : AuthService,) {
    this.url = environment.apiUrl + "/users";
  }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllUtilisateurPersonnel() {
    return this.httpClient.get<Array<UtilisateurDTO>>(this.url, {headers: this.getHeader()});
  }

  deleteUtilisateurById(id: number) {
    return this.httpClient.delete( this.url + '/'+id, {headers: this.getHeader()});
  }
}
