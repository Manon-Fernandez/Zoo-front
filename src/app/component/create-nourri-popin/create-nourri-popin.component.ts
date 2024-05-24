import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NourriService} from "../../services/nourri/nourri.service";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {Nourri} from "../../models/Nourri.model";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-nourri-popin',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './create-nourri-popin.component.html',
  styleUrl: './create-nourri-popin.component.css'
})
export class CreateNourriPopinComponent {

  nourriForm: FormGroup;
  mode: Mode;
  id : number = Object.create(null);

  @Output()
  onSubmit : EventEmitter<Nourri>;
  @Output()
  onUpdate : EventEmitter<Nourri>;

  constructor(
    private formBuilder: FormBuilder,
    private nourriService: NourriService,
    public dialogRef: MatDialogRef<CreateNourriPopinComponent>,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Nourri>();
    this.mode = data?.mode;
    if(data?.nourri && this.mode == Mode.EDIT){
      this.id = data?.nourri.id;
      this.nourriForm = this.formBuilder.group({
        prenom: [data.nourri.prenom, Validators.required],
        race: [data.nourri.race, Validators.required],
        date_nourriture: [data.nourri.date_nourture, Validators.required],
        grammage_nourriture: [data.nourri.grammage, Validators.required],
      });
    }
    this.onSubmit = new EventEmitter<Nourri>();
  }

  submit() {
    if (this.nourriForm.valid) {

      const formData = this.nourriForm.value;
      const feed = {
        id: this.mode === Mode.EDIT ? this.id : null,
        prenom: formData.prenom,
        race: formData.race,
        date_nourture: formData.date_nourture,
        grammage_nourriture: formData.grammage_nourriture,
      };
      let nourri: Nourri = new Nourri(feed);
      if (this.mode == Mode.CREATE) {
        this.nourriService.createNourri(nourri).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'Le formulaire a bien été sauvegardé !');
          this.onSubmit.emit(nourri);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT) {
        this.nourriService.updateNourri(nourri.id,nourri).subscribe( () => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'Le formulaire a bien été mis à jour !');
          this.onUpdate.emit(nourri);
          this.dialogRef.close();
        })

      }

    }

  }

  getSubmitButton() {
    if(this.mode == Mode.EDIT){
      return "Mise à jour"
    }else if(this.mode == Mode.CREATE){
      return "Créer"
    }
    return '';
  }

  closePopin() {
    this.dialogRef.close();
  }

}
