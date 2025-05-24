import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component' ;
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent, HttpClientModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'loginpage';
} 
