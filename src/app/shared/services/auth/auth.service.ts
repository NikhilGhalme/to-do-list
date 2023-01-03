import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.API_URL;
  // baseAuthUrl = environment.AUTH_URL;
  constructor(private http:HttpClient) { }

  signUp(param:object):Observable<any> {
    return this.http.post(this.baseUrl + '/register',param);
  }
  updateUser(param:object):Observable<any> {
    return this.http.put(this.baseUrl + '/register/', param);
  }
  login(param:object):Observable<any> {
    return this.http.post(this.baseUrl + '/login',param);
  }

  user(){
    return this.http.get(this.baseUrl + '/user');
  }
}
