import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Habitat} from "../../models/Habitat.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HabitatService {

  url : string;

  constructor(private httpClient : HttpClient,
              private authService: AuthService){
    this.url = environment.apiUrl + "/habitat";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllHabitat(){
    return this.httpClient.get<Array<Habitat>>(this.url);
  }

  updateHabitat(id: number, unHabitat: Habitat) {
    return this.httpClient.put(this.url + '/' + id, unHabitat.serialize(), {headers: this.getHeader()});
  }

  createHabitat(unHabitat: Habitat) {
    return this.httpClient.post(this.url,unHabitat.serialize(), {headers: this.getHeader()});
  }

  deleteHabitatById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});

  }
}
