import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Card } from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  baseUrl = environment.API_URL;
  constructor(private http:HttpClient) {}

  addCard(param:Card) {
    return this.http.post(this.baseUrl + '/cards', param);
  }
  updateCard(param:Card):Observable<any> {
    return this.http.put(this.baseUrl + `/cards/${param.id}`, param);
  }
  getCards() {
    return this.http.get(this.baseUrl + '/cards');
  }
  deleteCard(id:number) {
    return this.http.delete(this.baseUrl + `/cards/${id}`);
  }
  getWorkspaceCards(id:number) {
    return this.http.get(this.baseUrl + `/cards/${id}`);
  }

  searchCards(param:Object):any {
    return this.http.post(this.baseUrl + '/searchCards', param);
  }

}
