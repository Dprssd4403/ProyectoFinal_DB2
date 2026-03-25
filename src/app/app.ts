import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { Dashboards } from "./features/dashboards/dashboards";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, Dashboards],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TonEcu');
}
