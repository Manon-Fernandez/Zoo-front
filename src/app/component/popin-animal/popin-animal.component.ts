import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {Animal} from "../../models/Animal.model";
import {AnimalService} from "../../services/animal/animal.service";

@Component({
  selector: 'app-popin-animal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './popin-animal.component.html',
  styleUrl: './popin-animal.component.css'
})
export class PopinAnimalComponent {

  animalForm: FormGroup;
  @Output()
  onSubmit : EventEmitter<Animal>;
  @Output()
  onUpdate : EventEmitter<Animal>;

  mode: Mode;
  id : number = Object.create(null);


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopinAnimalComponent>,
    private toastService: ToastService,
    private animalService : AnimalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Animal>;
    this.mode = data?.mode;
    if(data?.animal && this.mode == Mode.EDIT){
      this.id = data?.animal.id;
      this.animalForm = this.formBuilder.group({
        prenom: [data.animal.prenom, Validators.required],
        race: [data.animal.race, Validators.required]
      });
    }
    else{
      this.animalForm = this.formBuilder.group({
        prenom: ['', Validators.required],
        race:['',Validators.required]
      });
    }

    this.onSubmit = new EventEmitter<Animal>();
  }

  submit(): void {
    if (this.animalForm.valid) {

      const formData = this.animalForm.value;
      const animal = {
        id: this.mode === Mode.EDIT ? this.id : null,
        prenom: formData.prenom,
        race: formData.race
      };
      let unAnimal: Animal = new Animal(animal);
      if(this.mode == Mode.CREATE) {
        this.animalService.createAnimal(unAnimal).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'l\'animal a bien été sauvegardé !');
          this.onSubmit.emit(unAnimal);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT){
        this.animalService.updateAnimal(unAnimal.id,unAnimal).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'l\'animal a bien été mise à jour !');
          this.onUpdate.emit(unAnimal);
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
      return "Modification d'un animal"
    }else if(this.mode == Mode.CREATE){
      return "Création d'un animal"
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
