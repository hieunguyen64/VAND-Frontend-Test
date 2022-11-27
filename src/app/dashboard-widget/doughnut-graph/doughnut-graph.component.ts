import { CountryService } from './../../../service/country.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'cdk-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {

    /**
     * Fake data to display on the pie chart
     */
    graphData = {};
  constructor(private countryService : CountryService) { }
    
  ngOnInit() {
    this.totaldeath.getCountry()
      setTimeout(() => {
          this.createBarGraph();
      },1500)

  }

  createBarGraph() {
    new Chart('doughnut-graph', {
          type: 'doughnut',
          data: {
            labels:this.totaldeath.countryCode,
              datasets: [{
                label: 'My First Dataset',
                data: this.totaldeath.TotalDeaths,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
          },
          options: {
            title: {
                display: true,
                text: 'Total Death Case'
            }
        }
      })
}
  
    public totaldeath = {
        data: <any>{},
        countryCode:<any>{},
        sortedTotalDeaths:<any>{},
        TotalDeaths:<any>{},
        getCountry: () => {
          this.countryService.getCountry().subscribe((resp: any) => {
            this.totaldeath.data = resp.Countries.slice(0,10)
            this.totaldeath.sortedTotalDeaths = this.totaldeath.data.sort((a, b) => (a.TotalDeaths > b.TotalDeaths ? -1 : 1))
            this.totaldeath.countryCode = this.totaldeath.sortedTotalDeaths.map((data: any)=> data.CountryCode)
            this.totaldeath.TotalDeaths = this.totaldeath.sortedTotalDeaths.map((data: any)=> data.TotalDeaths)
        })
        },
      }
}
