import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastService} from "../toast/toast.service";
import {environment} from "../../environments/environment";
import {Utilisateur, UtilisateurAuthenticate, UtilisateurCreate} from "../../models/Utilisateur.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string;
  constructor(private httpClient : HttpClient,
              private toastService : ToastService) {
    this.url = environment.apiUrl + "/auth";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getUtilisateurData().accessToken
    });
  }

  public authenticate(utilisateur : UtilisateurAuthenticate) {
    return this.httpClient.post(this.url +'/signin', utilisateur.serialize());
  }

  public setUtilisateur(utilisateur : Utilisateur) {
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur.serialize()));
  }

  public register(utilisateur : UtilisateurCreate) {
    return this.httpClient.post(this.url +'/signup', utilisateur.serialize(),{headers: this.getHeader()});
  }

  public getUtilisateurData(): Utilisateur {
    const utilisateurData = localStorage.getItem('utilisateur');
    const parsedData = utilisateurData ? JSON.parse(utilisateurData) : Object.create(null);
    return new Utilisateur(parsedData);
  }

  public isAuthenticated(): boolean {
    const utilisateur = this.getUtilisateurData();
    return utilisateur != null && utilisateur.accessToken != null;
  }

  isAdmin() {
    return this.getUtilisateurData().role.includes('ADMIN');
  }

  isEmploye() {
    return this.getUtilisateurData().role.includes('EMPLOYE');
  }

  isVeterinaire() {
    return this.getUtilisateurData().role.includes('Veterinaire');
  }

  logout() {
    localStorage.removeItem('utilisateur');
  }

  changePassword(utilisateurCreate1: UtilisateurCreate) {
    return this.httpClient.put(this.url + '/changePassword', utilisateurCreate1.serialize(), {headers: this.getHeader()});

  }
}
