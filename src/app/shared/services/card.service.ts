import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Card } from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  baseUrl = environment.API_URL;
  constructor(private http:HttpClient) {}

  addCard(param:Card) {
    return this.http.post(this.baseUrl + '/addCard', param);
  }
  getCards() {
    return this.http.get(this.baseUrl + '/getCards');
  }
  deleteCard(id:number) {
    return this.http.delete(this.baseUrl + `/getCards/${id}`);
  }
  getWorkspaceCards(id:number) {
    return this.http.get(this.baseUrl + `/getCards/${id}`);
  }
}
