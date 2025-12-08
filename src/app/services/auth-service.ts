import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey="AIzaSyBlWGieWH5-cZy3AwEO6CWojWFKIB2rsEc";
  public idToken:string = "";
  public onLoginStatusChanged = new EventEmitter();

  constructor (private httpClient:HttpClient) {
    const tmp = localStorage.getItem("idToken");

    if (tmp != null) {
      this.idToken = tmp;
    }
  }

  private onLogin(idToken:string){
    this.idToken = idToken;
    this.onLoginStatusChanged.emit();
    localStorage.setItem("idToken", idToken);
  }

  public login(email:string, password:string) {   
    return this.httpClient.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap((data) => {
        this.onLogin(data.idToken);
      })
    );  
  }

  public register(email:string, password:string) {
    return this.httpClient.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap((data) => {
        this.onLogin(data.idToken);
      })
    );
  }

  public logout() {
    this.idToken="";
    this.onLoginStatusChanged.emit();
    localStorage.setItem("idToken", "");
  }
}
