import {Component, OnInit} from '@angular/core';
import {Service} from "../../models/Service.model";
import {Horaire, Jour} from "../../models/Horaire.model";
import {UtilisateurDTO} from "../../models/Utilisateur.model";
import {NgIf, SlicePipe} from "@angular/common";
import {ZooServiceService} from "../../services/zooService/zoo-service.service";
import {UtilisateurService} from "../../services/utilisateur/utilisateur.service";
import {FormBuilder} from "@angular/forms";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {HoraireService} from "../../services/horaire/horaire.service";
import {PopinConfirmationComponent} from "../popin-confirmation/popin-confirmation.component";
import {PopinServiceComponent} from "../popin-service/popin-service.component";
import {PopinHoraireComponent} from "../popin-horaire/popin-horaire.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTooltip} from "@angular/material/tooltip";
import {MatTab} from "@angular/material/tabs";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {PopinPersonnelComponent} from "../popin-personnel/popin-personnel.component";
import {Sante} from "../../models/Sante";
import {MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {Habitat} from "../../models/Habitat.model";
import {HabitatService} from "../../services/habitat/habitat.service";
import {PopinHabitatComponent} from "../popin-habitat/popin-habitat.component";
import {Animal} from "../../models/Animal.model";
import {AnimalService} from "../../services/animal/animal.service";
import {PopinAnimalComponent} from "../popin-animal/popin-animal.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    SlicePipe,
    MatTooltip,
    MatTab,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    NgIf,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatSelect,
    MatOption
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  low: number;
  highValue: number;
  suppression: string;
  editer: string;
  services: Array<Service>;
  displayedColumnsService: Array<string>;
  horaires: Array<Horaire>;
  displayedColumnsHoraire: Array<string>;
  jours = Object.keys(Jour);
  personnel: Array<UtilisateurDTO>;
  displayedColumnsPersonnel: string[];
  santeList: Array<Sante>;
  habitat: Array<Habitat>;
  displayedColumnsHabitat: Array<string>;
  animal: Array<Animal>;
  displayedColumnsAnimal: Array<string>;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    public dialog: MatDialog,
    private zooService: ZooServiceService,
    private horaireService: HoraireService,
    private habitatService: HabitatService,
    private animalService: AnimalService,
    private utilisateurService: UtilisateurService,
  ) {
    this.services = [];
    this.horaires = [];
    this.habitat = [];
    this.animal = [];
    this.personnel = [];
    this.low = 0;
    this.highValue = 10;
    this.suppression = 'supprimer';
    this.editer = "mettre à jour";
    this.displayedColumnsPersonnel = ['email', 'action'];
    this.displayedColumnsService = ['nom', 'description', 'action'];
    this.displayedColumnsHoraire = ['jour', 'heure_ouverture', 'heure_fermeture', 'action'];
    this.displayedColumnsHabitat = ['nom', 'description', 'action'];
    this.displayedColumnsAnimal = ['prenom', 'race', 'action'];
    this.santeList = [];
  }

  ngOnInit() {
    this.zooService.getAllService().subscribe(lesServices => {
      lesServices.forEach(service => {
        this.services.push(new Service(service));
      });
      this.horaireService.getAllHoraires().subscribe(lesHoraires => {
        lesHoraires.forEach(horaire => {
          this.horaires.push(new Horaire(horaire));
        });
      });
      this.utilisateurService.getAllUtilisateurPersonnel().subscribe(personnel => {
        personnel.forEach(personnel => {
          this.personnel.push(new UtilisateurDTO(personnel));
        });
      });
      this.habitatService.getAllHabitat().subscribe(lesHabitats => {
        lesHabitats.forEach(habitat => {
          this.habitat.push(new Habitat(habitat));
        });
      });
    });
  }


  openPopupPersonnel() {
    const dialogRef = this.dialog.open(PopinPersonnelComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onCreate.subscribe(event => {
      if (event) {
        this.personnel = [];
        this.utilisateurService.getAllUtilisateurPersonnel().subscribe(reponse => {
          reponse.forEach(response => {
            this.personnel.push(response);
          });
        });
      }
    });
  }

  editPersonnel(element: UtilisateurDTO) {
    const dialogRef = this.dialog.open(PopinPersonnelComponent, {
      data: {
        mode: Mode.EDIT,
        personnel: element
      }
    });
  }

  removePersonnel(element : UtilisateurDTO) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.utilisateurService.deleteUtilisateurById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.personnel = this.personnel
            .filter(personnel =>personnel.id != element.id);
        })
      }
    });
  }

  createServices() {
    const dialogRef = this.dialog.open(PopinServiceComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.services = [];
      this.zooService.getAllService().subscribe(reponse => {
        reponse.forEach(response => {
          this.services.push(response);
        })
      });
    });
  }

  editService(element : Service) {
    const dialogRef = this.dialog.open(PopinServiceComponent,{
      data : {
        mode: Mode.EDIT,
        service: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.services = this.services
        .filter(service => service.id != value.id);
      this.services.push(value);
    })
  }

  removeService(element : Service) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.zooService.deleteServiceById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.services = this.services
            .filter(habitat =>habitat.id != element.id);
        })
      }
    });
  }

  getJourAvailable(horaires: Array<Horaire>) : Array<string> {
    let jours : Array<string> = [];
    this.jours.forEach(jour => {
      let isAvailable = true;
      horaires.forEach(horaire => {
        if (horaire.jour == jour) {
          isAvailable = false;
        }
      });
      if (isAvailable) {
        jours.push(jour);
      }
    });
    return jours;

  }

  createHoraire() {
    if(this.getJourAvailable(this.horaires).length > 0) {
      const dialogRef = this.dialog.open(PopinHoraireComponent, {
        data: {
          mode: Mode.CREATE,
          jours: this.getJourAvailable(this.horaires)
        }
      });
      dialogRef.componentInstance.onSubmit.subscribe(event => {
        this.horaireService.createHoraire(event).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La création a bien été effectuée !');
          this.horaires = [];
          this.horaireService.getAllHoraires().subscribe(reponse => {
            reponse.forEach(response => {
              this.horaires.push(response);
            });
          });
        });
      });
    }
    else {
      this.toastService.showToaster(ToastType.ERROR, 'Il n\'y a plus de jour disponible !');
    }
  }

  editHoraire(element : Horaire) {
    const dialogRef = this.dialog.open(PopinHoraireComponent,{
      data : {
        mode: Mode.EDIT,
        horaire: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.horaireService.updateHoraire(value.id,value).subscribe(response => {
        this.horaires = this.horaires
          .filter(horaire => horaire.id != value.id);
        this.horaires.push(value);
      });
    });
  }

  removeHoraire(element : Horaire) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.horaireService.deleteHoraireById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.horaires = this.horaires
            .filter(horaire =>horaire.id != element.id);
        })
      }
    });
  }

  createHabitat() {
    const dialogRef = this.dialog.open(PopinHabitatComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.habitat = [];
      this.habitatService.getAllHabitat().subscribe(reponse => {
        reponse.forEach(response => {
          this.habitat.push(response);
        })
      });
    });
  }

  editHabitat(element : Habitat) {
    const dialogRef = this.dialog.open(PopinHabitatComponent,{
      data : {
        mode: Mode.EDIT,
        habitat: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.habitat = this.habitat
        .filter(habitat => habitat.id != value.id);
      this.habitat.push(value);
    })
  }

  removeHabitat(element : Habitat) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.habitatService.deleteHabitatById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.habitat = this.habitat
            .filter(habitat =>habitat.id != element.id);
        })
      }
    });
  }

  createAnimal() {
    const dialogRef = this.dialog.open(PopinAnimalComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.animal = [];
      this.animalService.getAllAnimal().subscribe(reponse => {
        reponse.forEach(response => {
          this.animal.push(response);
        })
      });
    });
  }

  editAnimal(element : Animal) {
    const dialogRef = this.dialog.open(PopinAnimalComponent,{
      data : {
        mode: Mode.EDIT,
        animal: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.animal = this.animal
        .filter(animal => animal.id != value.id);
      this.animal.push(value);
    })
  }

  removeAnimal(element : Animal) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.animalService.deleteAnimalById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.animal = this.animal
            .filter(animal =>animal.id != element.id);
        })
      }
    });
  }

}

export enum Mode{
  CREATE,
  EDIT,
  DELETE
}
