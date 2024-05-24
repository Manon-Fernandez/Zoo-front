import {Component, OnInit} from '@angular/core';
import {Habitat} from "../../models/Habitat.model";
import {HabitatService} from "../../services/habitat/habitat.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-habitat',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatCardHeader,
    MatCardTitle,
    MatCardActions
  ],
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.css'
})
export class HabitatComponent implements OnInit{

  habitatArray: Array<Habitat>;

  constructor(private habitatService : HabitatService,
              public dialog : MatDialog) {
    this.habitatArray = [];
  }

  ngOnInit() {
    this.habitatService.getAllHabitat().subscribe(response => {
      response.forEach(reponse => {
        this.habitatArray.push(new Habitat(reponse));
      })
    })
  }

  openDialog(row : Habitat): void {
    const dialogRef = this.dialog.open(DetailPopinComponent, {
      data: {
        habitat: row
      },
    });
  }
}
