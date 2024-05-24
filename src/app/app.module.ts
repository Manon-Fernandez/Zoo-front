import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './component/root/app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ServiceComponent} from "./component/service/service.component";
import {HomeComponent} from "./component/home/home.component";
import {HabitatComponent} from "./component/habitat/habitat.component";
import {ContactComponent} from "./component/contact/contact.component";
import {LoginComponent} from "./component/login/login.component";
import {EmployeDashboardComponent} from "./component/employe-dashboard/employe-dashboard.component";
import {VeterinaireDashboardComponent} from "./component/veterinaire-dashboard/veterinaire-dashboard.component";
import {AdminDashboardComponent} from "./component/admin-dashboard/admin-dashboard.component";
import {Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'habitat', component: HabitatComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminDashboardComponent},
  {path: 'employe', component: EmployeDashboardComponent},
  {path: 'veterinaire', component: VeterinaireDashboardComponent}
];

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
