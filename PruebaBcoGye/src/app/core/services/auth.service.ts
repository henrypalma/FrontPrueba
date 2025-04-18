import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario, AuthStatus, LoginResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.API_URL;
  private http    = inject( HttpClient );
  private router  = inject( Router );

  private _currentUser = signal<Usuario|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );
  private configAuthToken: string = 'authToken'
  private configCurrentUser: string = 'currentUser'


  currentUserAuthenticated(): LoginResponse {
    const userlocalStorage= localStorage.getItem(this.configCurrentUser);
    return JSON.parse(userlocalStorage!);
  }

  private setAuthentication(loginResponse: LoginResponse): boolean {
    console.log(loginResponse);
    this._currentUser.set( loginResponse );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem(this.configAuthToken, loginResponse.token);
    localStorage.setItem(this.configCurrentUser, JSON.stringify(loginResponse));

    return true;
  }

  login( login: string, password: String): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/login`;
    const body = { login, password };
    console.log(url)
    console.log(body)
    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map(result => this.setAuthentication(result)),
        catchError( ex => throwError( () => ex.error ))
      );
  }

  loginapp( config: string, tenant: string): Observable<boolean> {
    let params = new HttpParams();
    params.set('config', config);
    params.set('tenant', tenant);
    const url = `${this.baseUrl}/auth/login-app?config=${config}&tenant=${tenant}`;
    return this.http.get<LoginResponse>( url,)
      .pipe(
        map(result => this.setAuthentication(result)),
        catchError( ex => throwError( () => ex.error ))
      );
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.configAuthToken);
    if (!token) return false;
    const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
    return Math.floor((new Date).getTime() / 1000) < expiry;
  }


  logout(): void {
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
    localStorage.removeItem(this.configAuthToken);
    localStorage.removeItem(this.configCurrentUser);
    this.router.navigate(['/login']);

  }



}
