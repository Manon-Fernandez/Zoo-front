import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Contact} from "../../models/Contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string;
  constructor(private httpClient : HttpClient) {
    this.url = environment.apiUrl + "/contact";
  }

  sendContact(contact : Contact) {
    return this.httpClient.post(this.url, contact);
  }

}
