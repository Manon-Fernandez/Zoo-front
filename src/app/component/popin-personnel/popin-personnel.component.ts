import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth/auth.service";
import {THREE} from "@angular/cdk/keycodes";
import {UtilisateurCreate} from "../../models/Utilisateur.model";

@Component({
  selector: 'app-popin-personnel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './popin-personnel.component.html',
  styleUrl: './popin-personnel.component.css'
})
export class PopinPersonnelComponent {

  signupForm: FormGroup;

  @Output()
  onCreate: EventEmitter<boolean>;
  mode: Mode;
  user: any;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PopinPersonnelComponent>,
              public authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.onCreate = new EventEmitter<boolean>();
    this.mode = data?.mode;
    this.user = data?.personnel;
    if (this.mode == Mode.CREATE){
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).{10,}')],
      });
    } else {
      this.signupForm = this.formBuilder.group({
        email: [this.user?.email, Validators.required],
        password: [this.user?.password, Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).{10,}')]
      });
      this.signupForm.get('email')?.disable()
    }
  }

  submit() {
    if (this.signupForm.valid) {
      if (this.mode == Mode.CREATE) {
        const formValue = this.signupForm.value;
        const utilisateurCreate = {
          email: formValue['email'],
          password: formValue['password'],
          role: ['EMPLOYE', 'VETERINAIRE']
        }
        this.authService.register(new UtilisateurCreate(utilisateurCreate)).subscribe(response => {
          this.onCreate.emit(true);
          this.dialogRef.close();
        });
      } else {
        const formValue = this.signupForm.value;
        const utilisateurCreate = {
          email: formValue['email'],
          password: formValue['password'],
          role: ['EMPLOYE', 'VETERINAIRE']
        }
        this.authService.changePassword(new UtilisateurCreate(utilisateurCreate)).subscribe(response => {
          this.onCreate.emit(true);
          this.dialogRef.close();
        });
      }
    }
  }

  checkForm() {
    this.signupForm.markAllAsTouched();
  }

  getTitle() {
    if (this.mode == Mode.CREATE) {
      return "Ajouter un compte";
    }
    return "Mettre à jour un compte";
  }

  getButton() {
    if (this.mode == Mode.CREATE) {
      return "Ajouter";
    }
    return "Mettre à jour";
  }

}
