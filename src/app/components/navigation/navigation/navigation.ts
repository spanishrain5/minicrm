import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  public isLoggedIn = false;

  constructor (private authService:AuthService, private router:Router) {

    if (this.authService.idToken=="") {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }

    authService.onLoginStatusChanged.subscribe( () => {
      if (this.authService.idToken=="") {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
      
    })
  }

  public logout () {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
