import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Service} from "../../models/Service.model";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {ZooServiceService} from "../../services/zooService/zoo-service.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-popin-service',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton
  ],
  templateUrl: './popin-service.component.html',
  styleUrl: './popin-service.component.css'
})
export class PopinServiceComponent {

  serviceForm: FormGroup;
  @Output()
  onSubmit : EventEmitter<Service>;
  @Output()
  onUpdate : EventEmitter<Service>;

  mode: Mode;
  id : number = Object.create(null);


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopinServiceComponent>,
    private toastService: ToastService,
    private zooService : ZooServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Service>;
    this.mode = data?.mode;
    if(data?.service && this.mode == Mode.EDIT){
      this.id = data?.service.id;
      this.serviceForm = this.formBuilder.group({
        nom: [data.service.nom, Validators.required],
        description: [data.service.description, Validators.required]
      });
    }
    else{
      this.serviceForm = this.formBuilder.group({
        nom: ['', Validators.required],
        description:['',Validators.required]
      });
    }

    this.onSubmit = new EventEmitter<Service>();
  }

  submit(): void {
    if (this.serviceForm.valid) {

      const formData = this.serviceForm.value;
      const service = {
        id: this.mode === Mode.EDIT ? this.id : null,
        nom: formData.nom,
        description: formData.description
      };
      let unService: Service = new Service(service);
      if(this.mode == Mode.CREATE) {
        this.zooService.createService(unService).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'le service a bien été sauvegardé !');
          this.onSubmit.emit(unService);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT){
        this.zooService.updateService(unService.id,unService).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'le service a bien été mise à jour !');
          this.onUpdate.emit(unService);
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
      return "Modification d'un service"
    }else if(this.mode == Mode.CREATE){
      return "Création d'un service"
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
