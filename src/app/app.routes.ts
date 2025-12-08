import { Routes } from '@angular/router';
import { ListCompanies } from './components/companies/list-companies/list-companies';
import { NewCompany } from './components/companies/new-company/new-company';
import { LoginForm } from './components/login-form/login-form';

export const routes: Routes = [
    {path:"", component:ListCompanies},
    {path:"new", component:NewCompany},
    {path:"login", component:LoginForm}
];
