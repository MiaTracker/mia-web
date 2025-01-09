import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Stats} from "../../models/stats";
import {StatisticsService} from "../../services/statistics.service";
import { Chart } from "chart.js/auto"

@Component({
    selector: 'app-stats-page',
    templateUrl: './stats-page.component.html',
    styleUrls: ['./stats-page.component.sass'],
    standalone: false
})
export class StatsPageComponent implements OnInit{
  protected stats: Stats | undefined;

  @ViewChild("mediaChart")
  protected mediaChartCtx!: ElementRef

  @ViewChild("logChart")
  protected logChartCtx!: ElementRef

  @ViewChild("genresChart")
  protected genresChartCtx!: ElementRef

  @ViewChild("languagesChart")
  protected languagesChartCtx!: ElementRef


  constructor(private service: StatisticsService) {
  }

  ngOnInit(): void {
    this.getStats();
  }

  protected getStats(): void {
    this.service.statistics().subscribe(x => { this.stats = x; this.createCharts(); });
  }

  private createCharts() {
    const plugin = {
      id: 'sumPlugin',
      beforeDraw: function(chart: Chart, args: any, options: any) {
        const width = chart.chartArea.width, height = chart.chartArea.height, ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        const text = options.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = chart.chartArea.top + (height / 2);
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    };

    new Chart(this.mediaChartCtx.nativeElement, {
      plugins: [plugin],
      type: 'doughnut',
      data: {
        labels: ['Movies', 'Series'],
        datasets: [{
          data: [this.stats?.media.movies, this.stats?.media.series],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          // @ts-ignore
          sumPlugin: {
            text: this.stats?.media.count
          },
          legend: {
            position: "right",
            align: "center",
            labels: {
              color: "white",
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: "Media",
            color: "white",
            font: {
              size: 20
            },
            padding: 20
          }
        },
        responsive: true,
      }
    });

    new Chart(this.logChartCtx.nativeElement, {
      plugins: [plugin],
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Uncompleted'],
        datasets: [{
          data: [this.stats?.logs.completed, this.stats?.logs.uncompleted],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          // @ts-ignore
          sumPlugin: {
            text: this.stats?.logs.logs
          },
          legend: {
            position: "right",
            align: "center",
            labels: {
              color: "white",
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: "Logs",
            color: "white",
            font: {
              size: 20
            },
            padding: 20
          }
        },
        responsive: true,
      }
    });

    new Chart(this.genresChartCtx.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.stats?.genres.map((x) => x.name),
        datasets: [{
          data: this.stats?.genres.map((x) => x.count),
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: "right",
            align: "center",
            labels: {
              color: "white",
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: "Genres",
            color: "white",
            font: {
              size: 20
            },
            padding: 20
          }
        },
        responsive: true,
      }
    });

    new Chart(this.languagesChartCtx.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.stats?.languages.map((x) => x.name),
        datasets: [{
          data: this.stats?.languages.map((x) => x.count),
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: "right",
            align: "center",
            labels: {
              color: "white",
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: "Languages",
            color: "white",
            font: {
              size: 20
            },
            padding: 20
          }
        },
        responsive: true,
      }
    });
  }

  protected readonly Math = Math;
}
