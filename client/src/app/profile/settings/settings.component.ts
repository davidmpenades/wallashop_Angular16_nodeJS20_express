import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService

  ) {
    this.settingsForm = this.fb.group({
      image: [''],
      username: [''],
      bio: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.user = userData;// Actualiza la propiedad currentUser con los datos del usuario actual
      this.settingsForm.patchValue(this.user) 
    });
    
       
  }
  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);
    
    this.userService
    .update(this.user)
    .subscribe(
      updatedUser => {
        this.router.navigate(['/profile/editProfile'])
        this.toastr.success("Has actualizado el perfil")
      },
      err => {
        this.isSubmitting = false;
        this.toastr.error("Algo ha fallado en la actualización")
      }
    );
  }
  updateUser(values: Object) {
    Object.assign(this.user, values);
  }
}
