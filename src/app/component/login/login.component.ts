import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {Utilisateur, UtilisateurAuthenticate} from "../../models/Utilisateur.model";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router,
              private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const formDate = this.loginForm.value;
    let utilisateurAuth = {
      email: formDate.email,
      password: formDate.password
    }
    this.authService.authenticate(new UtilisateurAuthenticate(utilisateurAuth)).subscribe(response => {
      const utilisateur = new Utilisateur(response);
      localStorage.setItem('utilisateur', JSON.stringify(utilisateur.serialize()));
      if(this.authService.isAuthenticated()){
        if(this.authService.isAdmin()){
          this.router.navigate(['/admin']);
        }
        else if(this.authService.isEmploye()){
          this.router.navigate(['/employe']);
        }else {
          this.router.navigate(['/veterinaire']);
        }
      }
    }, error => {
      if(error.error.message == 'Bad credentials') {
        this.toastService.showToaster(ToastType.ERROR, "Identifiants incorrects");
      }
    })

  }
}
