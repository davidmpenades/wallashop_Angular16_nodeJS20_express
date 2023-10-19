import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService, UserService } from '../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formbuilder.group({
      username: [''],
      email: [''],
      password: [''],
      passwordRepeat: [''],
    });
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {}

  submitRegisterForm() {
    const credentials = this.registerForm.value;

    this.userService.attempAuth('register', credentials).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Te has registrado con exito', '¡Felicidades!');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.toastr.error("Fallo al registrarse", "Error")
        this.registerForm = this.formbuilder.group({
          username: [''],
          email: [''],
          password: [''],
          passwordRepeat: [''],
        });
      },
    });
  }

  submitLoginForm() {
    const credentials = this.loginForm.value;

    this.userService.attempAuth('login', credentials).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Has iniciado sesion', '¡Felicidades!');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.toastr.error("Fallo al iniciar sesion", "Error")
        this.loginForm = this.formbuilder.group({
          email: [''],
          password: ['']
        });
      },
    });
  }
}
