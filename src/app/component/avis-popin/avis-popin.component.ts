import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Avis} from "../../models/Avis.model";

@Component({
  selector: 'app-avis-popin',
  templateUrl: './avis-popin.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  styleUrls: ['./avis-popin.component.css']
})
export class AvisPopinComponent {

  unAvis: Avis;
  avisForm: FormGroup;

  @Output()
  submit : EventEmitter<Avis>;

  constructor(public dialogRef: MatDialogRef<AvisPopinComponent>,
              private formBuilder: FormBuilder) {
    this.unAvis = Object.create(null);
    this.avisForm = this.formBuilder.group({
      commentaire: ['', Validators.required],
      pseudo: ['', Validators.required],
    });
    this.submit = new EventEmitter<Avis>;
  }


  onSubmit() {
    if(this.avisForm.valid) {
      const formData = this.avisForm.value;
      const avis = {
        'commentaire' : formData.commentaire,
        'pseudo': formData.pseudo,
      }
      this.submit.emit(new Avis(avis));
      // Réinitialisez le formulaire après la soumission
      this.dialogRef.close();
    }
  }


}
