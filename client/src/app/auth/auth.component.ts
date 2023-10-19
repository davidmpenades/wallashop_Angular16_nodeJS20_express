import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core';
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
  }

  ngOnInit() {}

  submitForm() {
    const credentials = this.registerForm.value;

    this.userService.attempAuth(credentials).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Te has registrado con exito', '¡Felicidades!');
          this.router.navigate(['/']);
        }
      },
    });
  }
}
