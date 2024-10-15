import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    address: '',
    dateOfBirth: '',
    phoneNumber: '',
    pictureUrl: '',
    role: 'ROLE_USER'
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now log in!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        
        let errorMessage = 'Please try again.'; 
        if (error.error instanceof ErrorEvent) {
         
          errorMessage = error.error.message;
        } else if (typeof error.error === 'string') {
          
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message; 
        } else if (error.error && typeof error.error === 'object') {
          
          errorMessage = JSON.stringify(error.error); 
        }

        console.error('Registration error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
