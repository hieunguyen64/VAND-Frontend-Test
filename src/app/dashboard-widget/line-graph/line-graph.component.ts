import { CountryService } from './../../../service/country.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'cdk-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {

  constructor(private countryService : CountryService) { }

  ngOnInit() {
    this.totalrecovery.getCountry()
    setTimeout(() => {
        this.createLineChart();
    },2000)
  }
  createLineChart() {
      new Chart('line-graph', {
                type: 'line',
                data: {
                    labels: this.totalrecovery.countryCode,
                    datasets: [{
                        backgroundColor: 'rgba(92, 107, 192, 0.36)',
                        borderColor: 'rgba(92, 107, 192,.5)',
                        data: this.totalrecovery.TotalRecovered,
                        label: 'Dataset',
                        fill: 'start'
                    }]
                },
                options: {
                    elements : {
                        line: {
                            tension: 0.000001
                        }
                    },
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        filler: {
                            propagate: false
                        }
                    },
                    title: {
                        display: true,
                        text: 'Recovered case'
                    }
                }
        })
  }
  public totalrecovery = {
    data: <any>{},
    countryCode:<any>{},
    sortedTotalRecovered:<any>{},
    TotalRecovered:<any>{},
    getCountry: () => {
      this.countryService.getCountry().subscribe((resp: any) => {
        this.totalrecovery.data = resp.Countries.slice(66,76)
        this.totalrecovery.sortedTotalRecovered = this.totalrecovery.data.sort((a, b) => (a.TotalRecovered < b.TotalRecovered ? -1 : 1))
        this.totalrecovery.countryCode = this.totalrecovery.sortedTotalRecovered.map((data: any)=> data.CountryCode)
        this.totalrecovery.TotalRecovered = this.totalrecovery.sortedTotalRecovered.map((data: any)=> data.TotalRecovered)
    })
    },
  }

}
