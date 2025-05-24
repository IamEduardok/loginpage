// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'; // Ajuste a porta se necessário

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      password
    });
  }

  login(email: string, password: string) {
    return this.http.post<{success: boolean, user: any}>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
} 