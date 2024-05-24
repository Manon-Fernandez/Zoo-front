import {Component, OnInit} from '@angular/core';
import {Service} from "../../models/Service.model";
import {ZooServiceService} from "../../services/zooService/zoo-service.service";
import {MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{

  service : Array<Service>;

  constructor(private zooService : ZooServiceService,) {
    this.service = [];
  }

  ngOnInit() {
    this.zooService.getAllService().subscribe(service => {
      service.forEach(service => {
        this.service.push(new Service(service));
      })
    })
  }

}
