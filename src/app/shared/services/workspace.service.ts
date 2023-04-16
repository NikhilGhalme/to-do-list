import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Workspace } from "../models/workspace";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  baseUrl = environment.API_URL;
  constructor(private http:HttpClient) { }

  addWorkspace(param:object): Observable<any>{
    return this.http.post(this.baseUrl + '/workspace', param)
  }
  updateWorkspace(param:Workspace): Observable<any>{
    return this.http.put(this.baseUrl + `/workspace/${param.id}`, param)
  }
  getWorkspace(): Observable<any>{
    return this.http.get(this.baseUrl + '/workspaces')
  }
  deleteWorkspace(id:number): Observable<any>{
    return this.http.delete(this.baseUrl + `/workspace/${id}`)
  }
}
