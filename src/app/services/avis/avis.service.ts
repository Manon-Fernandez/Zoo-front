import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Avis, Status} from "../../models/Avis.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  url : string;
  constructor(private httpClient: HttpClient,
              private authService: AuthService){
    this.url = environment.apiUrl + '/avis';
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllAvis() {
    return this.httpClient.get<Array<Avis>>(this.url);
  }

  getAllAvisByStatus(status : Status){
    return this.httpClient.get<Array<Avis>>(this.url + '/status/' + Status[status]);
  }

  createAvis(unAvis : Avis){
    return this.httpClient.post(this.url, unAvis.serialize(), {headers: this.getHeader()});
  }

  createAvisWithStatus(unAvis : Avis,status : Status){
    return this.httpClient.post(this.url +'/status/' + Status[status], unAvis.serialize(), {headers: this.getHeader()});
  }

  updateAvisByStatus(unAvis : Avis, status : Status){
    return this.httpClient.put(this.url +'/status/' + Status[status], unAvis.serialize(), {headers: this.getHeader()});
  }

  deleteAvisById(id: number){
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});
  }
}
