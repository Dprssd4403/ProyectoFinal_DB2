import { Component, OnInit } from '@angular/core';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

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

  public chart1 = this.sdk.createChart({
    chartId: '71c854ba-2faa-4cfd-af5e-3913cfc862b5',
  });

  public chart2 = this.sdk.createChart({
    chartId: '0917ce2d-3913-4a7c-9973-8b2b0f05ed2b',
  });

  async ngOnInit() {
    const container1 = document.getElementById('chart-tendencias');
    if (container1) await this.chart1.render(container1);

    const container2 = document.getElementById('chart-seguidores');
    if (container2) await this.chart2.render(container2);
  }

  async aplicarFiltroChart1(event: any) {
  const valor = event.target.value;
  try {
    if (valor === 'TODOS') {
      await this.chart1.setFilter({});
    } else {

      await this.chart1.setFilter({ 
        "_id": { "$regex": valor, "$options": "i" } 
      });
    }
  } catch (err) {
    console.error("Error al filtrar álbum:", err);
  }
}

  async aplicarFiltroChart2(event: any) {
    const valor = event.target.value;
    try {
      const filtro = valor === 'TODOS' ? {} : { "_id": valor };
      await this.chart2.setFilter(filtro);
    } catch (err) {
      console.error(err);
    }
  }

  public refrescarGraficos() {
    Promise.all([
      this.chart1.refresh(),
      this.chart2.refresh()
    ]).catch(err => console.error(err));
  }
}