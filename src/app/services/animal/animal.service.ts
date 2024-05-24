import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";
import {Animal} from "../../models/Animal.model";
import {Sante} from "../../models/Sante";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  url : string;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
    this.url = environment.apiUrl + "/animal";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllAnimal() {
    return this.httpClient.get<Array<Animal>>(this.url);
  }

  updateAnimal(id: number, unAnimal: Animal) {
    return this.httpClient.put(this.url + '/' + id, unAnimal.serialize(), {headers: this.getHeader()});
  }

  createAnimal(unAnimal: Animal) {
    return this.httpClient.post(this.url,unAnimal.serialize(), {headers: this.getHeader()});
  }

  deleteAnimalById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});
  }

}
