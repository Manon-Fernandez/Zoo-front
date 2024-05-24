import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatListItem} from "@angular/material/list";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    NgIf,
    RouterLink,
    RouterLinkActive,
    MatListItem,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay()
    );

  openBurgerMenu : boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService : AuthService) {
    this.openBurgerMenu = false;
  }

  changeBurgerMenu() {
    this.openBurgerMenu = !this.openBurgerMenu;
  }

  deconnexion() {
    this.changeBurgerMenu();
    this.authService.logout();
  }

  isConnected() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.isConnected() && this.authService.isAdmin();
  }

  isEmploye() {
    return this.isConnected() && this.authService.isEmploye();
  }

  isVeterinaire() {
    return this.isConnected() && this.authService.isVeterinaire();
  }

}
