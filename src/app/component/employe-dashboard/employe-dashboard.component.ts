import {Component, OnInit} from '@angular/core';
import {NgIf, SlicePipe} from "@angular/common";
import {Avis, Status} from "../../models/Avis.model";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {AvisService} from "../../services/avis/avis.service";
import {Service} from "../../models/Service.model";
import {ZooServiceService} from "../../services/zooService/zoo-service.service";
import {PopinConfirmationComponent} from "../popin-confirmation/popin-confirmation.component";
import {PopinServiceComponent} from "../popin-service/popin-service.component";
import {FormBuilder} from "@angular/forms";
import {NourriService} from "../../services/nourri/nourri.service";
import {Nourri} from "../../models/Nourri.model";
import {CreateNourriPopinComponent} from "../create-nourri-popin/create-nourri-popin.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-employe-dashboard',
  standalone: true,
  imports: [
    SlicePipe,
    MatTab,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatTooltip,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    MatTabGroup
  ],
  templateUrl: './employe-dashboard.component.html',
  styleUrl: './employe-dashboard.component.css'
})
export class EmployeDashboardComponent implements OnInit{

  lesAvis: Array<Avis>;
  low: number;
  highValue: number;
  displayedColumns: Array<string>;
  validation: string;
  suppression: string;
  editer: string;
  service : Array<Service>;
  displayedColumnsService : Array<string>;
  nourriList: Array<Nourri>;
  displayedColumnsNourri: Array<string>;
  isEmploye: boolean;

  constructor(
    private toastService: ToastService,
    private avisService: AvisService,
    public dialog: MatDialog,
    private zooService: ZooServiceService,
    private formBuilder: FormBuilder,
    private nourriService: NourriService,
    private utilisateurService : AuthService,
  ) {
    this.lesAvis = [];
    this.low = 0;
    this.highValue = 10;
    this.displayedColumns = ['pseudo', 'commentaire', 'status', 'action'];
    this.validation = 'valider l\'avis';
    this.suppression = 'supprimer';
    this.editer = 'mettre à jour';
    this.service = [];
    this.displayedColumnsService = ['nom', 'description', 'action'];
    this.nourriList = [];
    this.displayedColumnsNourri = ['prénom', 'race', 'date nourriture', 'grammage nourriture'];
    this.isEmploye = this.utilisateurService.isEmploye();
  }

  ngOnInit() {
    this.avisService.getAllAvis().subscribe(avisArray => {
      avisArray.forEach(avis => {
        this.lesAvis.push(new Avis(avis));
      })
    });
    this.zooService.getAllService().subscribe(lesServices => {
      lesServices.forEach(service => {
        this.service.push(new Service(service));
      })
    });
    this.nourriService.getAllNourri().subscribe(nourriArray => {
      nourriArray.forEach(nourri => {
        this.nourriList.push(new Nourri(nourri));
      })
    });
  }

  checkIfAvisIsSubmitted(element: Avis) {
    return element.status.toString() == "EN_ATTENTE";
  }

  validAvis(element: Avis) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.avisService.updateAvisByStatus(element,Status.VALIDE).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'l\'avis a bien été validé !');
          element.status = Status.VALIDE;
        })
      }
    });
  }

  deleteAvis(element: Avis) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.avisService.deleteAvisById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'la suppression a bien été effectuée !');
          this.lesAvis = this.lesAvis
            .filter(avis =>avis.id != element.id);
        })
      }
    });
  }

  createService() {
    const dialogRef = this.dialog.open(PopinServiceComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.service = [];
      this.zooService.getAllService().subscribe(reponse => {
        reponse.forEach(response => {
          this.service.push(response);
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
      this.service = this.service
        .filter(service => service.id != value.id);
      this.service.push(value);
    })
  }

  removeService(element : Service) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.zooService.deleteServiceById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.service = this.service
            .filter(service =>service.id != element.id);
        })
      }
    });
  }

  createNourri() {
    const dialogRef = this.dialog.open(CreateNourriPopinComponent,{
      data : {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.nourriList = [];
      this.nourriService.getAllNourri().subscribe(reponse => {
        reponse.forEach(response => {
          this.nourriList.push(response);
        })
      });
    });
  }

  editNourri(element : Nourri) {
    const dialogRef = this.dialog.open(CreateNourriPopinComponent,{
      data : {
        mode: Mode.EDIT,
        nourri: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.nourriList = this.nourriList
        .filter(nourri => nourri.id != value.id);
      this.nourriList.push(value);
    })
  }

  removeNourri(element: Nourri) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.nourriService.deleteNourriById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'la suppression a bien été effectuée !');
          this.nourriList = this.nourriList
            .filter(nourri =>nourri.id != element.id);
        })
      }
    });
  }

}
