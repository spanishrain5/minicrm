import { Routes } from '@angular/router';
import { ListCompanies } from './components/companies/list-companies/list-companies';
import { NewCompany } from './components/companies/new-company/new-company';

export const routes: Routes = [
    {path:"", component:ListCompanies},
    {path:"new", component:NewCompany}
];
