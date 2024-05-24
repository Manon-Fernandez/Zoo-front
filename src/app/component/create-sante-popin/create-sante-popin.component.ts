import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatInput, MatLabel} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Sante} from "../../models/Sante";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {SanteService} from "../../services/sante/sante.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastService, ToastType} from "../../services/toast/toast.service";

@Component({
  selector: 'app-create-sante-popin',
  standalone: true,
  imports: [
    MatButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './create-sante-popin.component.html',
  styleUrl: './create-sante-popin.component.css'
})
export class CreateSantePopinComponent {

  santeForm: FormGroup;

  @Output()
  onSubmit: EventEmitter<Sante>;
  @Output()
  onUpdate: EventEmitter<Sante>;
  mode: Mode;
  id: number = Object.create(null);

  constructor(
    private formBuilder: FormBuilder,
    private santeService: SanteService,
    public dialogRef: MatDialogRef<CreateSantePopinComponent>,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Sante>;
    this.mode = data?.mode;
    if(data?.sante && this.mode == Mode.EDIT){
      this.id = data?.sante.id;
      this.santeForm = this.formBuilder.group({
        prenom: [data.sante.prenom, Validators.required],
        race: [data.sante.race, Validators.required],
        etat_animal: [data.sante.etat_animal, Validators.required],
        nourriture: [data.sante.nourriture, Validators.required],
        grammage: [data.sante.grammage, Validators.required],
        date_passage: [data.sante.date_passage, Validators.required],
      });
    }
    this.onSubmit = new EventEmitter<Sante>();
  }


  submit() {
    if (this.santeForm.valid) {

      const formData = this.santeForm.value;
      const health = {
        id: this.mode === Mode.EDIT ? this.id : null,
        prenom: formData.prenom,
        race: formData.race,
        etat_animal: formData.etat_animal,
        nourriture: formData.nourriture,
        grammage_nourriture: formData.grammage_nourriture,
        date_passage: formData.date_passage
      };
      let sante: Sante = new Sante(health);
      if(this.mode == Mode.CREATE){
        this.santeService.createSante(sante).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'Le compte rendu a bien été sauvegardé !');
          this.onSubmit.emit(sante);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT){
        this.santeService.updateSante(sante.id,sante).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'Le compte rendu a bien été mis à jour !');
          this.onUpdate.emit(sante);
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
