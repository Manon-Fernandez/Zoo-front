import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Horaire} from "../../models/Horaire.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-popin-horaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf,
    MatFormField,
    MatInput,
    NgIf,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './popin-horaire.component.html',
  styleUrl: './popin-horaire.component.css'
})
export class PopinHoraireComponent {

  mode: Mode;
  jours: Array<string>;
  horaireForm: FormGroup;
  noFermetureMorning : boolean;
  id : number;

  @Output()
  onUpdate : EventEmitter<Horaire>;

  @Output()
  onSubmit : EventEmitter<Horaire>;

  constructor(public dialogRef: MatDialogRef<PopinHoraireComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
    this.mode = data?.mode;

    if(this.mode == Mode.CREATE) {
      this.jours = data?.jours;
    }else {
      this.jours = [data?.horaire?.jour];
    }
    if(this.mode == Mode.CREATE) {
      this.id = -1;
      this.horaireForm = this.formBuilder.group({
        jour: ['', Validators.required],
        morningOpeningTime: ['', Validators.required],
        morningCloseTime: ['', Validators.required],
        afternoonOpenTime: ['', Validators.required],
        afternoonCloseTime: ['', Validators.required]
      }, {validator: this.timeValidator()});
      this.noFermetureMorning = false;
    }else {
      this.id = data?.horaire?.id;
      this.horaireForm = this.formBuilder.group({
        jour: [data?.horaire?.jour, Validators.required],
        morningOpeningTime: [data?.horaire?.heure_ouverture.split('-')[0] == undefined ?
          data?.horaire?.heure_ouverture : data?.horaire?.heure_ouverture.split('-')[0], Validators.required],
        morningCloseTime: [data?.horaire?.heure_ouverture.split('-')[1] == undefined ?
          '' : data?.horaire?.heure_ouverture.split('-')[1], Validators.required],

        afternoonOpenTime: [data?.horaire?.heure_fermeture.split('-')[1] == undefined ?
          '' : data?.horaire?.heure_fermeture.split('-')[0], Validators.required],
        afternoonCloseTime: [data?.horaire?.heure_fermeture.split('-')[1] == undefined ?
          data?.horaire?.heure_fermeture : data?.horaire?.heure_fermeture.split('-')[1], Validators.required]

      }, {validator: this.timeValidator()});
      if (data?.horaire?.heure_ouverture.split('-')[1] == undefined){
        this.noFermetureMorning = true;
        this.changeClose(this.noFermetureMorning);
        this.horaireForm.markAllAsTouched();
      } else {
        this.noFermetureMorning = false;
      }
    }

    this.onSubmit = new EventEmitter<Horaire>();
    this.onUpdate = new EventEmitter<Horaire>();
  }

  timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const morningOpeningTime = group.get('morningOpeningTime')?.value;
      const morningCloseTime = group.get('morningCloseTime')?.value;
      const afternoonOpenTime = group.get('afternoonOpenTime')?.value;
      const afternoonCloseTime = group.get('afternoonCloseTime')?.value;

      if(!this.noFermetureMorning) {
        if (morningOpeningTime && morningCloseTime && afternoonOpenTime && afternoonCloseTime) {
          if (morningOpeningTime >= morningCloseTime) {
            return {invalidMorningTime: true};
          }
          if (afternoonOpenTime <= morningCloseTime || afternoonOpenTime >= afternoonCloseTime) {
            return {invalidAfternoonTime: true};
          }
        }
      }else{
        if (morningOpeningTime && afternoonCloseTime) {
          if (morningOpeningTime > afternoonCloseTime) {
            return {invalidAfternoonTime: true};
          }
        }
      }

      return null;
    };
  }

  getTitle(): string {
    if(this.mode == Mode.CREATE){
      return 'Création d\'un nouvel horaire';
    }else if(this.mode == Mode.EDIT){
      return 'Modification d\'un horaire';
    }
    return '';
  }


  getSubmitButton() {
    if(this.mode == Mode.CREATE){
      return 'Créer';
    }else if(this.mode == Mode.EDIT){
      return 'Mise à jour';
    }
    return '';
  }

  submit() {
    //verification des champs

    if (this.horaireForm.valid) {

      //si il n'y a pas de fermeture le matin on met les valeurs a null
      if(this.noFermetureMorning){
        this.horaireForm.get('morningCloseTime')?.setValue(null);
        this.horaireForm.get('afternoonOpenTime')?.setValue(null);
        this.horaireForm.updateValueAndValidity();
      }
      const formData = this.horaireForm.value;
      const horaire = {
        id: this.id == -1 ? null : this.id,
        jour: formData.jour,
        heure_ouverture: formData.morningCloseTime != undefined ? formData.morningOpeningTime + '-' + formData.morningCloseTime : formData.morningOpeningTime,
        heure_fermeture: formData.afternoonOpenTime != undefined ? formData.afternoonOpenTime + '-' + formData.afternoonCloseTime : formData.afternoonCloseTime,
      };
      if(this.mode == Mode.CREATE){
        this.onSubmit.emit(new Horaire(horaire));
      }else if(this.mode == Mode.EDIT){
        this.onUpdate.emit(new Horaire(horaire));
      }
      this.dialogRef.close();
    }

  }

  changeClose(event : boolean){
    const morningCloseTime = this.horaireForm.get('morningCloseTime');
    const afternoonOpenTime = this.horaireForm.get('afternoonOpenTime');
    if(event){
      morningCloseTime?.clearValidators();
      afternoonOpenTime?.clearValidators();
      this.noFermetureMorning = true;
      //on rend les elements non obligatoire
    }else{
      morningCloseTime?.setValidators([Validators.required]);
      afternoonOpenTime?.setValidators([Validators.required]);
      this.noFermetureMorning = false;
    }
    morningCloseTime?.updateValueAndValidity();
    afternoonOpenTime?.updateValueAndValidity();
  }

  changeMorningClose(event: any) {
    const morningCloseTime = this.horaireForm.get('morningCloseTime');
    const afternoonOpenTime = this.horaireForm.get('afternoonOpenTime');
    if(event.checked){
      morningCloseTime?.clearValidators();
      afternoonOpenTime?.clearValidators();
      this.noFermetureMorning = true;
      //on rend les elements non obligatoire
    }else{
      morningCloseTime?.setValidators([Validators.required]);
      afternoonOpenTime?.setValidators([Validators.required]);
      this.noFermetureMorning = false;
    }
    morningCloseTime?.updateValueAndValidity();
    afternoonOpenTime?.updateValueAndValidity();
  }

  closePopint() {
    this.dialogRef.close();
  }
}
