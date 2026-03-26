import { Component, OnInit } from '@angular/core';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

@Component({
  selector: 'app-explorador',
  standalone: true,
  templateUrl: './explorador.html',
  styleUrl: './explorador.css',
})
export class Explorador implements OnInit {
  // Configuración del SDK con tu URL base de MongoDB Atlas
  private sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-proyectofinal-ncownrz',
  });

  // Gráfico 1: Análisis de Impacto (Géneros - Color Naranja)
  public chartImpacto = this.sdk.createChart({
    chartId: '1dede645-5e22-4b88-a90f-ecc791caeacc',
  });

  // Gráfico 2: Distribución de Estrenos (Años - Color Morado)
  public chartLanzamientos = this.sdk.createChart({
    chartId: '615afb20-2ea2-4c17-8630-6a7ec6438cf3',
  });

  async ngOnInit() {
    try {
      // Renderizamos ambos gráficos en sus contenedores HTML
      await Promise.all([
        this.chartImpacto.render(document.getElementById('chart-impacto')!),
        this.chartLanzamientos.render(document.getElementById('chart-lanzamientos')!)
      ]);
      console.log('Charts cargados exitosamente con los datos reales');
    } catch (err) {
      console.error('Error crítico al renderizar los charts:', err);
    }
  }

  /**
   * Filtro para el Chart de Impacto (Géneros)
   * Maneja las cadenas exactas como "country, pop, indie, folk"
   */
  async filtrarImpactoPorGenero(event: any) {
    const generoSeleccionado = event.target.value;
    console.log("Filtrando Género:", generoSeleccionado);

    try {
      if (generoSeleccionado === 'TODOS') {
        // Limpiar filtro
        await this.chartImpacto.setFilter({});
      } else {
        /**
         * Aplicamos el filtro al campo 'artist_genres'. 
         * Usamos el valor exacto del <option> del HTML.
         */
        await this.chartImpacto.setFilter({ 
          "artist_genres": generoSeleccionado 
        });
      }
    } catch (err) {
      console.error("Fallo al filtrar impacto:", err);
    }
  }

  /**
   * Filtro para el Chart de Lanzamientos (Años)
   * Convierte el año a número para la consulta
   */
  async filtrarLanzamientosPorAnio(event: any) {
    const anioSeleccionado = event.target.value;
    console.log("Filtrando Año:", anioSeleccionado);

    try {
      if (anioSeleccionado === 'TODOS') {
        await this.chartLanzamientos.setFilter({});
      } else {
        const anioNum = parseInt(anioSeleccionado);
        
        /**
         * Filtro de seguridad:
         * Buscamos por el campo numérico 'year' o 'anio'.
         * También probamos buscar el año como texto dentro de la fecha completa
         * por si el campo 'album_release_date' es un String.
         */
        await this.chartLanzamientos.setFilter({
          $or: [
            { "year": anioNum },
            { "anio": anioNum },
            { "album_release_date": { $regex: anioSeleccionado } }
          ]
        });
      }
    } catch (err) {
      console.error("Fallo al filtrar lanzamientos:", err);
    }
  }

  /**
   * Función para refrescar manualmente los datos
   */
  public refrescarDashboard() {
    Promise.all([
      this.chartImpacto.refresh(),
      this.chartLanzamientos.refresh()
    ]).then(() => {
      console.log("Dashboard actualizado");
    }).catch(err => console.error("Error al refrescar:", err));
  }
}