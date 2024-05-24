import {Component, OnInit} from '@angular/core';
import {NgIf, SlicePipe} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatTab} from "@angular/material/tabs";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {Mode} from "../admin-dashboard/admin-dashboard.component";
import {Nourri} from "../../models/Nourri.model";
import {PopinConfirmationComponent} from "../popin-confirmation/popin-confirmation.component";
import {Sante} from "../../models/Sante";
import {SanteService} from "../../services/sante/sante.service";
import {CreateSantePopinComponent} from "../create-sante-popin/create-sante-popin.component";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-veterinaire-dashboard',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTab,
    MatTable,
    SlicePipe,
    MatTooltip,
    MatHeaderCellDef,
  ],
  templateUrl: './veterinaire-dashboard.component.html',
  styleUrl: './veterinaire-dashboard.component.css'
})
export class VeterinaireDashboardComponent implements OnInit{

  low: number;
  highValue: number;
  displayedColumnsSante: Array<string>;
  suppression: string;
  editer: string;
  santeList: Array<Sante>;
  nourriList: Array<Nourri>;
  isVeterinaire: boolean;

  constructor(
    private toastService: ToastService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private santeService: SanteService,
    private utilisateurService: AuthService
  ) {
    this.low = 0;
    this.highValue = 10;
    this.displayedColumnsSante = ['prenom', 'race', 'etat animal', 'nourriture', 'grammage', 'date passage'];
    this.suppression = 'supprimer';
    this.editer = 'mettre à jour';
    this.santeList = [];
    this.nourriList = [];
    this.isVeterinaire = this.utilisateurService.isVeterinaire();
  }

  ngOnInit() {
    this.santeService.getAllSante().subscribe( santeArray => {
      santeArray.forEach(sante => {
        this.santeList.push(new Sante(sante));
      })
    })
  }


  createSante() {
    const dialogRef = this.dialog.open(CreateSantePopinComponent,{
      data : {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.santeList = [];
      this.santeService.getAllSante().subscribe(reponse => {
        reponse.forEach(response => {
          this.santeList.push(response);
        })
      });
    });
  }

  editSante(element : Sante) {
    const dialogRef = this.dialog.open(CreateSantePopinComponent,{
      data : {
        mode: Mode.EDIT,
        sante: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.santeList = this.santeList
        .filter(sante => sante.id != value.id);
      this.santeList.push(value);
    })
  }

  removeSante(element: Sante) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.santeService.deleteSanteById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'la suppression a bien été effectuée !');
          this.santeList = this.santeList
            .filter(sante =>sante.id != element.id);
        })
      }
    });
  }
}
