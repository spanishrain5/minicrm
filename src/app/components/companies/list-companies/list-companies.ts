import { Component } from '@angular/core';
import { CompaniesService } from '../../../services/companies-service';
import { Company } from '../../../models/company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-companies',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-companies.html',
  styleUrl: './list-companies.css'
})
export class ListCompanies {

  public companies:Company[] = [];
  public companiesList:Company[] = [];
  public isLoading = false;
  public isError = false;
  public errorMessage = "";

  public filterName = '';
  public filterCode = '';

  constructor (public companiesService:CompaniesService, private authService:AuthService, private router:Router) {
    this.isLoading = true;
    this.companiesService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.companiesList = data;

        console.log(this.companies);

        this.isLoading = false;
      },
      error: (data) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "An error occurred when loading data."
      }
    })
  }

  public filterCompanies() {
    if (this.filterName !== '') {
      console.log(this.companiesList);
      this.companies = this.companiesList.filter( (c) => (c.name?.includes(this.filterName)) );
      console.log(this.companiesList);
    } else {
      this.companies = this.companiesList;
    }

    if(this.filterCode !== '') {
      this.companies = this.companies.filter( (c) => (c.code?.toString().includes(this.filterCode)) )
    }
  }
}
