import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  xaxis: any;
};

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [0, 0],
      chart: {
        width: 520,
        type: "donut",
      },
      colors: ["#6ddccf", "#fa1e0e"],
      labels: ["Entrada", "Saída"],
      xaxis: {
        labels: {
          style: {
            colors: '#fff',
            fontSize: '12px'
          }
        }
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 430
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };
    // colors: ['#F44336', '#E91E63', '#9C27B0']
  }

  ngOnInit() {
    this.populateChart()

    setInterval(() => {
      this.populateChart()
    }, 300)
  }

  populateChart() {

    let valores = JSON.parse(localStorage.getItem("controle"))

    let entradas: number = 0
    let saidas: number = 0

    for (let i in valores) {
      if (valores[i].tipo === 'Entrada') {
        entradas = entradas + valores[i].valor
      } else {
        saidas = saidas + valores[i].valor
      }
    }

    this.chartOptions.series = [entradas, saidas]
  }
}
