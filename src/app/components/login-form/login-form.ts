import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {

  public isLogin = true;
  public email:string="";
  public password:string="";

  constructor (private authService:AuthService, private router:Router) {

  }

  public onLogin() {
    if (this.isLogin){
      this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          console.log(data.idToken);
          this.router.navigate(['/']);
        }
      });
    } else {
      this.authService.register(this.email, this.password).subscribe( {
        next: (data) => {
          console.log(data.idToken);
          this.router.navigate(['/']);
        }
      });
    }
  }

}
