import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';




@Component({ 
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   constructor(
    private authService: AuthService,
    private router: Router 
  ) {}
    // Ícones do FontAwesome
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  isActive = false;
  errorMessage: string | null = null;
  
  signUpData = {
    name: '',
    email: '',
    password: ''
  };

  signInData = {
    email: '',
    password: ''
  };

 

  toggleActive(state: boolean): void {
    this.isActive = state;
    this.errorMessage = null;
  }

  // src/app/login/login.component.ts
onSignUp(event: Event): void {
  event.preventDefault();
  console.log('Dados de cadastro:', this.signUpData); // Adicione para debug
  
  this.authService.register(
    this.signUpData.name,
    this.signUpData.email,
    this.signUpData.password
  ).subscribe({
    next: (response) => {
      console.log('Resposta do servidor:', response);
      this.toggleActive(false);
      this.errorMessage = null;
      alert('Cadastro realizado com sucesso!');
    },
    error: (err) => {
      console.error('Erro no cadastro:', err);
      this.errorMessage = err.error?.message || 'Erro no cadastro';
    }
  });
}

onSignIn(event: Event): void {
  event.preventDefault();
  console.log('Dados de login:', this.signInData); // Adicione para debug
  
  this.authService.login(
    this.signInData.email,
    this.signInData.password
  ).subscribe({
    next: (response) => {
      console.log('Resposta do login:', response);
      if (response.success) {
        // Redirecionar para a página após login
        this.router.navigate(['/register']); 
      }
    },
    error: (err) => {
      console.error('Erro no login:', err);
      this.errorMessage = err.error?.message || 'Credenciais inválidas';
    }
  });
}
} 