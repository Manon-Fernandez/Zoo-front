import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {Avis, Status} from "../../models/Avis.model";
import {AvisService} from "../../services/avis/avis.service";
import {Service} from "../../models/Service.model";
import {Habitat} from "../../models/Habitat.model";
import {HabitatService} from "../../services/habitat/habitat.service";
import {ZooServiceService} from "../../services/zooService/zoo-service.service";
import {AvisPopinComponent} from "../avis-popin/avis-popin.component";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    MatCardHeader,
    MatCardContent,
    NgIf,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  avisList : Array<Avis>;
  service : Array<Service>;
  habitat : Array<Habitat>;

  constructor(private avisService : AvisService,
              private zooService : ZooServiceService,
              private habitatService : HabitatService,
              public dialog : MatDialog,
              private toastService : ToastService,
              private router : Router) {
    this.avisList = [];
    this.service = [];
    this.habitat = [];
  }

  ngOnInit(): void {
    this.avisService.getAllAvisByStatus(Status.VALIDE).subscribe(avis => {
      avis.forEach(unAvis => {
        this.avisList.push(new Avis(unAvis));
      });
    });
    this.zooService.getAllService().subscribe(service => {
      service.forEach(service => {
        this.service.push(new Service(service));
      });
    });
    this.habitatService.getAllHabitat().subscribe(habitat => {
      habitat.forEach(habitat => {
        this.habitat.push(new Habitat(habitat));
      })
    })
  }

  openPopinAvis() {
    const dialogRef = this.dialog.open(AvisPopinComponent);
    dialogRef.componentInstance.submit.subscribe((response : Avis) => {
      response.status = Status.EN_ATTENTE;
      this.avisService.createAvis(response).subscribe(response => {
        this.toastService.showToaster(ToastType.SUCCESS.toString(), 'Votre avis a bien été soumis !');
        if (response instanceof Avis) {
          this.avisList.push(response);
        }
      })
    });
  }

}
