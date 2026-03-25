import { Component, OnInit } from '@angular/core';

// Declaramos la variable global del SDK que cargamos en index.html
declare var ChartsEmbedSDK: any;

@Component({
  selector: 'app-dashboards',
  standalone: true, // Si usas Angular moderno
  imports: [],
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.css',
})
export class Dashboards implements OnInit {
  sdk: any;
  dashboard: any;

  ngOnInit() {
    // 1. Inicializar el SDK con tu URL base
    this.sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-proyectofinal-ncownrz'
    });

    // 2. Crear la instancia del Dashboard (usando tu ID de la captura)
    this.dashboard = this.sdk.createDashboard({
      dashboardId: '046e34ec-098a-41ab-8b4a-dde068ef09f0',
      background: '#F1F5F4',
      widthMode: 'scale',
      heightMode: 'scale'
    });

    this.renderDashboard();
  }

  async renderDashboard() {
    try {
      // 3. Renderizar en el div con ID 'chart-container'
      await this.dashboard.render(document.getElementById('chart-container'));
    } catch (err) {
      console.error("Error al renderizar el dashboard:", err);
    }
  }

  // 4. Función de filtrado dinámico
  async filtrarGenero(event: any) {
    const generoSeleccionado = event.target.value;
    
    if (generoSeleccionado === 'todos') {
      // Limpia todos los filtros
      await this.dashboard.setFilter({});
    } else {
      // Aplica el filtro al campo "Genero" (Asegúrate que se llame así en tu Atlas)
      await this.dashboard.setFilter({ "Genero": generoSeleccionado });
    }
  }
}