import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private url = "https://minicrm-6689e-default-rtdb.europe-west1.firebasedatabase.app/companies";

  public companies:Company[] = [];
  public newCompanyAdded = false;

  constructor(private http:HttpClient, private authService:AuthService, private router:Router) {
    
  }

  public getCompanies() {
    if (this.authService.idToken == '') {
      this.router.navigate(["/login"]);
    }

    return this.http.get<{[key: string]: Company}>(this.url + ".json", {
      params: {
        auth: this.authService.idToken
      }
    }).pipe(
      map((data) => {
        const companies:Company[] = [];

        for (let k in data){
          data[k].id = k;
          companies.push(data[k]);
        }
        
        return companies;
      }),
      tap((data) => {
        this.companies = data;
      })
    );
  }

  public addCompany (company:Company) {
    return this.http.post(this.url + ".json", company, {
      params: {
        auth: this.authService.idToken
      } 
    });
  }
}
