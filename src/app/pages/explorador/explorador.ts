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


  public chartImpacto = this.sdk.createChart({
    chartId: '1dede645-5e22-4b88-a90f-ecc791caeacc',
  });


  public chartLanzamientos = this.sdk.createChart({
    chartId: '615afb20-2ea2-4c17-8630-6a7ec6438cf3',
  });

  async ngOnInit() {
    try {
    
      await Promise.all([
        this.chartImpacto.render(document.getElementById('chart-impacto')!),
        this.chartLanzamientos.render(document.getElementById('chart-lanzamientos')!)
      ]);
      console.log('Charts cargados exitosamente con los datos reales');
    } catch (err) {
      console.error('Error crítico al renderizar los charts:', err);
    }
  }


  async filtrarImpactoPorGenero(event: any) {
    const generoSeleccionado = event.target.value;
    console.log("Filtrando Género:", generoSeleccionado);

    try {
      if (generoSeleccionado === 'TODOS') {
        // Limpiar filtro
        await this.chartImpacto.setFilter({});
      } else {
       
        await this.chartImpacto.setFilter({ 
          "artist_genres": generoSeleccionado 
        });
      }
    } catch (err) {
      console.error("Fallo al filtrar impacto:", err);
    }
  }


  async filtrarLanzamientosPorAnio(event: any) {
    const anioSeleccionado = event.target.value;
    console.log("Filtrando Año:", anioSeleccionado);

    try {
      if (anioSeleccionado === 'TODOS') {
        await this.chartLanzamientos.setFilter({});
      } else {
        const anioNum = parseInt(anioSeleccionado);
    
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

  public refrescarDashboard() {
    Promise.all([
      this.chartImpacto.refresh(),
      this.chartLanzamientos.refresh()
    ]).then(() => {
      console.log("Dashboard actualizado");
    }).catch(err => console.error("Error al refrescar:", err));
  }
}