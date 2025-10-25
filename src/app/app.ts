import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation/navigation";
import { NewCompany } from "./components/companies/new-company/new-company";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, NewCompany],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('minicrm');
}
