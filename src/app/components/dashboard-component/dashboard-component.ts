import { Component, OnInit } from '@angular/core';

import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';



@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})

export class DashboardComponent implements OnInit {

  private sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-proyectofinal-ncownrz',
  });

  public chart = this.sdk.createChart({
    chartId: '0d5669c4-9671-4003-9ea4-0ecf555e5bc8',
  });
  

  constructor() { }

  async ngOnInit() {

    const chartContainer = document.getElementById('chart');

    if (chartContainer) {

      await this.chart.render(chartContainer)
        .then(() => console.log('Gráfico renderizado correctamente'))
        .catch((err) => console.error('Error al renderizar el gráfico:', err));

    }

  }



  async aplicarFiltro(event: any) {
    const valorSeleccionado = event.target.value;
    console.log("Valor seleccionado en el HTML:", valorSeleccionado);

    try {
      if (valorSeleccionado === 'TODOS') {
        await this.chart.setFilter({});
        console.log("Filtro limpiado");
      } else {
      const filtro = { "Genero": valorSeleccionado };
        await this.chart.setFilter(filtro);
        console.log("Filtro aplicado para:", valorSeleccionado);
      }
    } catch (err) {
      console.error("Error al aplicar el filtro en MongoDB Charts:", err);
    }
  }

  public refrescarGrafico() {
    this.chart.refresh()
      .then(() => console.log('Gráfico actualizado'))
      .catch((err) => console.error('Error al refrescar:', err));
  }
}