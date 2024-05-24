import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {ToastService, ToastType} from "../services/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      // si l'utilisateur souhaite aller sur la page admin
      if (state.url == '/admin') {
        if (this.authService.isAdmin()){
          return true;
        }
        if (this.authService.isEmploye()){
          this.toastr.showToaster(ToastType.ERROR, "Vos droits ne vous permettent pas d'accéder à cette page");
          this.router.navigate(['/home']);
        }
        if (this.authService.isVeterinaire()){
          this.toastr.showToaster(ToastType.ERROR, "Vos droits ne vous permettent pas d'accéder à cette page");
          this.router.navigate(['/home']);
        }
      } else if(state.url == '/employe' && this.authService.isAdmin()) {
        this.toastr.showToaster(ToastType.ERROR, "Vos droits ne vous permettent pas d'accéder à cette page");
        this.router.navigate(['/home']);
        if (this.authService.isVeterinaire()){
          this.toastr.showToaster(ToastType.ERROR, "Vos droits ne vous permettent pas d'accéder à cette page");
          this.router.navigate(['/home']);
        }
      }else if (state.url == '/employe') {
        if (this.authService.isEmploye()) {
          return true;
        }
        } else if(state.url == '/veterinaire' && this.authService.isAdmin()){
          this.toastr.showToaster(ToastType.ERROR, "Vos droits ne vous permettent pas d'accéder à cette page");
          this.router.navigate(['/home']);
      }
        if (this.authService.isEmploye()){
          this.toastr.showToaster(ToastType.ERROR, "Vos droits ne vous permettent pas d'accéder à cette page");
          this.router.navigate(['/home']);
        } else if (state.url == '/veterinaire') {
          if (this.authService.isVeterinaire()) {
            return true;
          }
        }

      return this.router.navigate(['/home']);
    }
    this.toastr.showToaster(ToastType.ERROR, "Vous devez être connecté pour accéder à cette page");
    this.router.navigate(['/login']);
    return false;
  }
}

