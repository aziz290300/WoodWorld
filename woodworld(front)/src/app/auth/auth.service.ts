import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/User';

const API_URL = 'http://localhost:8085/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8085/auth'; 
  private readonly TOKEN_KEY = 'auth-token';
  private readonly USER_KEY = 'auth-user';

  constructor(private http: HttpClient, private router: Router) { }

  /**Login**/
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          // Save token and user information to session storage
          sessionStorage.setItem(this.TOKEN_KEY, response.token);
          sessionStorage.setItem('user-id', response.id);
          sessionStorage.setItem('user-username', response.username);
          sessionStorage.setItem('user-email', response.email);
          sessionStorage.setItem('user-role', response.role); // Store role
          
          console.log('User role stored in session:', sessionStorage.getItem('user-role')); // For debugging
        }
      })
    );
  }
  

  /*Register*/
  register(user: { 
    username: string; 
    email: string; 
    password: string; 
    address: string; 
    dateOfBirth: string; 
    phoneNumber: string; 
    pictureUrl?: string; 
    role: string; 
}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/signup`, user, { headers });
}


  

logout(): void {
  sessionStorage.clear();
  this.router.navigate(['/login']); 
}

  /* JWT f session */
  private saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  /**info mtaa l user f  session */
  private saveUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

 
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  
  getUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  //
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
