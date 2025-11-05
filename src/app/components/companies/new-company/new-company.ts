import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CompaniesService } from '../../../services/companies-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-company',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-company.html',
  styleUrl: './new-company.css'
})
export class NewCompany {

  public newCompanyForm:FormGroup;
  public isLoading = false;
  public isError = false;
  public errorMessage = "";

  constructor(private companiesService:CompaniesService, private router:Router) {
    this.newCompanyForm = new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.pattern('^[^\\d]+$'), Validators.minLength(2), Validators.maxLength(30)], []),
      'code':new FormControl(null, [Validators.pattern('^[0-9]+$')], []),
      'pvm':new FormControl(null, [Validators.pattern('^(?:LT)?\\d+$')], []),
      'address':new FormControl(null, [], []),
      'email':new FormControl(null, [Validators.required, Validators.email], []),
      'phone':new FormControl(null, [Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^\\+370\\d{8}$')], []),
      'contacts':new FormArray([
        new FormGroup({
          'name':new FormControl(null, [], []),
          'surname':new FormControl(null, [], []),
          'role':new FormControl(null, [], []),
          'phone':new FormControl(null, [Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^\\+370\\d{8}$')], []),
        })
      ])
    });
  }

  public submitForm() {
    const formValue = this.newCompanyForm.value;

    this.isLoading = true;
    this.isError = false;

    this.companiesService.addCompany(formValue).subscribe({
        next:() => {
          this.isLoading = false;
          this.router.navigate(['']);
        },
        error:() => {
          this.isError = true;
          this.isLoading = false;
          this.errorMessage = "An error occurred when uploading data to the server.";
        }
      }
    );

    console.group('Company Details');
    console.log('Name:', formValue.name);
    console.log('Code:', formValue.code);
    console.log('PVM:', formValue.pvm);
    console.log('Address:', formValue.address);
    console.log('Email:', formValue.email);
    console.log('Phone:', formValue.phone);
    console.groupEnd();

    console.group('Contacts');
    if (formValue.contacts && formValue.contacts.length > 0) {
      formValue.contacts.forEach((contact: any, index: number) => {
        console.group(`Contact #${index + 1}`);
        console.log('Name:', contact.name);
        console.log('Surname:', contact.surname);
        console.log('Role:', contact.role);
        console.log('Phone:', contact.phone);
        console.groupEnd();
      });
    } else {
      console.log('No contacts added.');
    }
    console.groupEnd();
  }

  public trackByIndex(index: number): number {
    return index;
  }

  // private validateNumber(c:FormControl):ValidationErrors | null {
  //   if ( /^[0-9]+$/.test(c.value) ){
  //     console.log(c.value);
  //     return null;
  //   }
  //   else {
  //     console.log('wrong');
  //     return{error:"Wrong number format"};
  //   }

  //   // return{error:"Wrong number format"};
  // }

  get contacts() {
    return this.newCompanyForm.get('contacts') as FormArray
  }

  public addContactField(){
    (this.newCompanyForm.get('contacts') as FormArray).push(
      new FormGroup({
          name: new FormControl(null),
          surname: new FormControl(null),
          role: new FormControl(null),
          phone: new FormControl(null, [
            Validators.minLength(10),
            Validators.maxLength(12),
            Validators.pattern('^\\+370\\d{8}$')
          ]),
      })
    )
  }

  public removeContactField(){
    (this.newCompanyForm.get('contacts') as FormArray).removeAt(-1)
  }
}
