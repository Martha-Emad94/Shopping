import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from './../../models/login';
import { Register } from '../../models/register';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private apibase = 'https://api.escuelajs.co/api/v1/users';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private httpclient: HttpClient) {
    // Initialize currentUserSubject from localStorage
    const name = localStorage.getItem('name');
    this.currentUserSubject.next(name ? name : null);
    this.loggedInSubject.next(localStorage.getItem('isAuthenticated') === 'true');
  }

  register(user: Register): Observable<Register> {
    console.log('Registering user:', user); 
    return this.httpclient.post<Register>(`${this.apibase}`, user);
  }

  login(data: Login): Observable<any> {
    return this.httpclient.get<any[]>(`${this.apibase}`).pipe(
      map(users => {
        console.log('Fetched users:', users); // تسجيل المستخدمين المسترجعين
        const user = users.find(
          (user) => user.email === data.email && user.password === data.password
        );
        if (user) {
          localStorage.setItem('isAuthenticated', 'true');
          this.setLoggedIn(true);
          this.setUserName(user.name);
          return user;
        } else {
          throw new Error('User not found or incorrect credentials');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('name');
    this.loggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }


  setUserName(name: string) {
    localStorage.setItem('name', name);
    this.currentUserSubject.next(name); // Update BehaviorSubject
  }

  getUserName(): Observable<string | null> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticatedStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  setLoggedIn(status: boolean) {
    localStorage.setItem('isAuthenticated', status ? 'true' : 'false');
    this.loggedInSubject.next(status);
  }
}
