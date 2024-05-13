import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Hourly } from '../../../types';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  public chart: any;
  @Input() data: Hourly[] = [];

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const labels = this.data.slice(0, 8).map((hour) => {
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = hour.dt * 1000 + localOffset;
      const date = new Date(utc);
      return (
        date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0')
      );
    });

    const dataForChart = this.data.slice(0, 8).map((hour) => Math.round(hour.feels_like));

    this.chart = new Chart('chart', {
      type: 'line',

      data: {
        labels: labels,
        datasets: [
          {
            data: dataForChart,
            backgroundColor: 'transparent',
            borderColor: '#284b63',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            // display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          datalabels: {
            color: 'white',
            anchor: 'center',
            align: 'end',
            formatter: (value, context) => value + 'º',
          },
        },
        elements: {
          line: {
            tension: 0.7
          }
        },
        layout: {
          padding: {
            bottom: 0,
            top: 28
          }
        }
      },
      plugins: [ChartDataLabels],
    });
  }
}
