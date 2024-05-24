import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Habitat} from "../../models/Habitat.model";
import {Mode} from "../admin-dashboard/admin-dashboard.component";

@Component({
  selector: 'app-detail-popin',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './detail-popin.component.html',
  styleUrl: './detail-popin.component.css'
})
export class DetailPopinComponent implements OnInit{

  habitat: Habitat;
  mode: Mode;

  constructor(
    public dialogRef: MatDialogRef<DetailPopinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.habitat = new Habitat(data?.habitat);
    this.mode = data?.mode;
  }

  ngOnInit() {
  }
}
