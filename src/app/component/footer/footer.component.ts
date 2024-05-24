import {Component, OnInit} from '@angular/core';
import {Horaire} from "../../models/Horaire.model";
import {HoraireService} from "../../services/horaire/horaire.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  horaires: Array<Horaire>;
  isLoading: boolean;

  constructor(private horaireService : HoraireService) {
    this.horaires = [];
    this.isLoading = true;
  }

  ngOnInit(){
    this.horaireService.getAllHoraires().subscribe(response => {
      response.forEach(reponse => {
        this.horaires.push(new Horaire(reponse));
      })
      this.isLoading = false;
    })

  }

  getHeureOuvertureFermeture(horaire : Horaire) : string {
    let heureOuverture = '';
    //si on split avec un - et que c'est undefined, c'est qu'il n'y a pas de fermeture le matin
    if (horaire.heure_ouverture.split('-')[1] == undefined){
      heureOuverture = horaire.heure_ouverture +  ' - ' + horaire.heure_fermeture;
    }
    else {
      heureOuverture = horaire.heure_ouverture.split('-')[0] + ' - ' + horaire.heure_ouverture.split('-')[1] +
        ' et ' + horaire.heure_fermeture.split('-')[0] + ' - ' + horaire.heure_fermeture.split('-')[1];
    }

    return heureOuverture;
  }
}
