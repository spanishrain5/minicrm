import { Component } from '@angular/core';
import { CompaniesService } from '../../../services/companies-service';
import { Company } from '../../../models/company';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-companies',
  imports: [CommonModule],
  templateUrl: './list-companies.html',
  styleUrl: './list-companies.css'
})
export class ListCompanies {

  public companies:Company[] = [];
  public isLoading = false;
  public isError = false;
  public errorMessage = "";

  constructor (private companiesService:CompaniesService) {
    this.isLoading = true;
    this.companiesService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;

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
}
