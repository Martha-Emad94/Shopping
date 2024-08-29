import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiAuthService } from '../../services/Auth/api-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
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
    HttpClientModule
  ],
  providers: [ApiAuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerform: FormGroup;

  hide: boolean = true;
  constructor(private auth: ApiAuthService, private fb: FormBuilder, private router: Router) {
    this.registerform = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      avatar: ['', [ Validators.pattern('https?://.+')]]
      /*phone: ['', [Validators.required, this.lengthValidator(11)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['']*/
    }, {
      validator: this.matchValidator('password', 'confirmpassword')
    });

  }
  onRegister() {
    if (this.registerform.valid) {
      // Provide a default avatar URL if not supplied by the user
      const payload = {
        ...this.registerform.value,
        avatar: this.registerform.value.avatar || 'https://default-avatar-url.com/default-avatar.png'
      };
  
      this.auth.register(payload).subscribe({
        next: (res) => {
          console.log("Registration successful", res);
          this.router.navigateByUrl("/login");
        },
        error: (error) => {
          console.error("Registration failed", error);
          alert('Registration failed: ' + (error.error?.message || 'Please check the input and try again.'));
        }
      });
    }
  }

  routerLogin() {
    this.router.navigateByUrl("/login")
  }
  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlToMatch = control.get(controlName);
      const matchingControl = control.get(matchingControlName);

      if (controlToMatch && matchingControl && controlToMatch.value !== matchingControl.value) {
        matchingControl.setErrors({ match: true });
        return { match: true };
      } else {
        return null;
      }
    };
  }
  lengthValidator(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length !== length) {
        return { length: true }; // Validation error object
      }
      return null; // Validation passed
    };
  }



}




