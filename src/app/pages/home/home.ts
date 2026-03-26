import { Component } from '@angular/core';
import { DashboardComponent } from "../../components/dashboard-component/dashboard-component";


@Component({
  selector: 'app-home',
  imports: [DashboardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
