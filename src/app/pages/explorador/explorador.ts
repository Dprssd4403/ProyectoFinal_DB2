import { Component, OnInit } from '@angular/core';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

@Component({
  selector: 'app-explorador',
  standalone: true,
  templateUrl: './explorador.html',
  styleUrl: './explorador.css',
})
export class Explorador implements OnInit {
  private sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-proyectofinal-ncownrz',
  });

  // Chart 1: Distribución de Estrenos -> FILTRO POR AÑO
  // Corregido ID: 1dede...
  public chartLanzamientos = this.sdk.createChart({
    chartId: '615afb20-2ea2-4c17-8630-6a7ec6438cf3',
  });

  // Chart 2: Análisis de Impacto -> FILTRO POR GÉNERO
  // Corregido ID: 615af...
  public chartImpacto = this.sdk.createChart({
    chartId: '1dede645-5e22-4b88-a90f-ecc791caeacc',
  });

  async ngOnInit() {
    try {
      // Renderizamos en los contenedores correspondientes
      await this.chartLanzamientos.render(document.getElementById('chart-lanzamientos')!);
      await this.chartImpacto.render(document.getElementById('chart-impacto')!);
    } catch (err) {
      console.error('Error al cargar charts:', err);
    }
  }

  // Filtro de Año para el primer gráfico (Lanzamientos)
  async filtrarLanzamientosPorAnio(event: any) {
    const valor = event.target.value;
    console.log("Filtrando lanzamientos por año:", valor);

    if (valor === 'TODOS') {
      await this.chartLanzamientos.setFilter({});
    } else {
      const anioNum = parseInt(valor);
      // Ajuste de filtro flexible por si el campo es 'year' o 'anio'
      await this.chartLanzamientos.setFilter({ 
        $or: [ { "year": anioNum }, { "anio": anioNum } ] 
      });
    }
  }

  // Filtro de Género para el segundo gráfico (Impacto)
  async filtrarImpactoPorGenero(event: any) {
    const genero = event.target.value;
    console.log("Filtrando impacto por género:", genero);

    if (genero === 'TODOS') {
      await this.chartImpacto.setFilter({});
    } else {
      // Ajuste de filtro flexible por si el campo es 'genre' o 'genero'
      await this.chartImpacto.setFilter({ 
        $or: [ { "genre": genero }, { "genero": genero } ] 
      });
    }
  }

  public refrescarLanzamientos() {
    Promise.all([
      this.chartLanzamientos.refresh(), 
      this.chartImpacto.refresh()
    ]).then(() => console.log("Charts actualizados"));
  }
}