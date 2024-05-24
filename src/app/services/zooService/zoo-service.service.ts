import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Service} from "../../models/Service.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ZooServiceService {

  url : string;

  constructor(private httpClient : HttpClient,
              private authService: AuthService){
    this.url = environment.apiUrl + "/service";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUtilisateurData().accessToken
    });
  }

  getAllService(){
    return this.httpClient.get<Array<Service>>(this.url);
  }

  updateService(id: number, unService: Service) {
    return this.httpClient.put(this.url + '/' + id, unService.serialize(), {headers: this.getHeader()});
  }

  createService(unService: Service) {
    return this.httpClient.post(this.url,unService.serialize(), {headers: this.getHeader()});
  }

  deleteServiceById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});

  }
}
