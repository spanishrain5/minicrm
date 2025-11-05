import { Contact } from 'D:/vartotojo_sasajos/angular/minicrm/src/app/models/contact';

export class Company{
    public id:string|null = null;
    public name:String|null = null;
    public code:number|null = null;
    public pvm:number|null = null;
    public address:String|null = null;
    public email:String|null = null;
    public phone:number|null = null;
    public contacts:Contact[]= [];
}