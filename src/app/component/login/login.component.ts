import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  // Add MatIconModule for icons
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../services/Auth/api-auth.service';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../services/user/user.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent
  ],
  providers: [ApiAuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Corrected property name
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  showHeader: boolean = false;
  loginForm: FormGroup;
  name: string | null = "";

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private auth: ApiAuthService,
    private user: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
 
  }

  onLogin() {
    if (this.loginForm.valid) {
      const data: Login = this.loginForm.value;
      console.log('Attempting login with:', data);
  
      this.auth.login(data).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          if (res) {
            this.auth.setUserName(res.name); 
            console.log(res.name)// Make sure res.username is correctly returned from the API
            this.auth.setLoggedIn(true);
            this.auth.getUserName().subscribe(name => {
              console.log('Username set to:', name);
            });
            
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            console.log('Is authenticated after login:', isAuthenticated);
            this.showHeader = true;
            this.router.navigateByUrl('/home');
          } 
        },
        error: (error) => {
          console.error('Error during login:', error);
        }
      });
    }
  }
  

  routerRegister() {
    this.router.navigateByUrl("/register");
  }
}
