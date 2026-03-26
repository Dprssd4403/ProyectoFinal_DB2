import { Component, OnInit } from '@angular/core';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { DashboardComponent } from "../../components/dashboard-component/dashboard-component";

@Component({
  selector: 'app-tendencias',
  standalone: true,
  templateUrl: './tendencias.html',
  styleUrl: './tendencias.css',
})
export class Tendencias implements OnInit {
  private sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-proyectofinal-ncownrz',
  });

  // Primer Chart: Top 10 Artistas
  public chart1 = this.sdk.createChart({
    chartId: 'f1bc31fe-46e2-46c8-be84-c0e128215793',
  });

  // Segundo Chart: El nuevo ID que proporcionaste
  public chart2 = this.sdk.createChart({
    chartId: '4893399a-295f-4b3a-ad33-e6e0be920b54',
  });

  async ngOnInit() {
    // Renderizar primer gráfico
    const container1 = document.getElementById('chart-tendencias');
    if (container1) {
      await this.chart1.render(container1);
    }

    // Renderizar segundo gráfico
    const container2 = document.getElementById('chart-seguidores');
    if (container2) {
      await this.chart2.render(container2);
    }
  }

  public refrescarGraficos() {
    // Refresca ambos al mismo tiempo
    Promise.all([
      this.chart1.refresh(),
      this.chart2.refresh()
    ]).then(() => console.log('Todos los gráficos actualizados'))
      .catch(err => console.error('Error al refrescar:', err));
  }
}