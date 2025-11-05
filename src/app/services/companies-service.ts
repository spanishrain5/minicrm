import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private url = "https://minicrm-6689e-default-rtdb.europe-west1.firebasedatabase.app/companies";

  constructor(private http:HttpClient) {
    
  }

  public getCompanies() {
    return this.http.get<{[key: string]: Company}>(this.url + ".json").pipe(
      map((data) => {
        const companies:Company[] = [];

        for (let k in data){
          data[k].id = k;
          companies.push(data[k]);
        }
        
        return companies;
      })
    );
  }

  public addCompany (company:Company) {
    return this.http.post(this.url + ".json", company);
  }
}
