import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Service} from "../../models/Service.model";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {ZooServiceService} from "../../services/zooService/zoo-service.service";
import {Habitat} from "../../models/Habitat.model";
import {HabitatService} from "../../services/habitat/habitat.service";

@Component({
  selector: 'app-popin-habitat',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './popin-habitat.component.html',
  styleUrl: './popin-habitat.component.css'
})
export class PopinHabitatComponent {

  habitatForm: FormGroup;
  @Output()
  onSubmit : EventEmitter<Habitat>;
  @Output()
  onUpdate : EventEmitter<Habitat>;

  mode: Mode;
  id : number = Object.create(null);


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopinHabitatComponent>,
    private toastService: ToastService,
    private habitatService : HabitatService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Habitat>;
    this.mode = data?.mode;
    if(data?.habitat && this.mode == Mode.EDIT){
      this.id = data?.habitat.id;
      this.habitatForm = this.formBuilder.group({
        nom: [data.habitat.nom, Validators.required],
        description: [data.habitat.description, Validators.required]
      });
    }
    else{
      this.habitatForm = this.formBuilder.group({
        nom: ['', Validators.required],
        description:['',Validators.required]
      });
    }

    this.onSubmit = new EventEmitter<Habitat>();
  }

  submit(): void {
    if (this.habitatForm.valid) {

      const formData = this.habitatForm.value;
      const habitat = {
        id: this.mode === Mode.EDIT ? this.id : null,
        nom: formData.nom,
        description: formData.description
      };
      let unHabitat: Habitat = new Habitat(habitat);
      if(this.mode == Mode.CREATE) {
        this.habitatService.createHabitat(unHabitat).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'l\'habitat a bien été sauvegardé !');
          this.onSubmit.emit(unHabitat);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT){
        this.habitatService.updateHabitat(unHabitat.id,unHabitat).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'l\'habitat a bien été mise à jour !');
          this.onUpdate.emit(unHabitat);
          this.dialogRef.close();
        })

      }

    }
  }

  closePopin() {
    this.dialogRef.close();
  }

  getTitle(){
    if(this.mode == Mode.EDIT){
      return "Modification d'un habitat"
    }else if(this.mode == Mode.CREATE){
      return "Création d'un habitat"
    }
    return '';
  }

  getSubmitButton(){
    if(this.mode == Mode.EDIT){
      return "Mise à jour"
    }else if(this.mode == Mode.CREATE){
      return "Créer"
    }
    return '';
  }
}
