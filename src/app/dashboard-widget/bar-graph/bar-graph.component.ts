import { CountryService } from './../../../service/country.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'cdk-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  constructor( private countryService: CountryService) { }

  ngOnInit() {
    this.content.getCountry()
      setTimeout(() => {
          this.createBarGraph();
      },1500)
      
  }
  createBarGraph() {
      new Chart('dash-bar-graph', {
            type: 'bar',
            data: {
                labels: this.content.countryCode,
                datasets: [
                    {
                        backgroundColor: 'rgba(92, 107, 192, .7)',
                        borderColor: 'rgba(92, 107, 192, .7)',
                        data: this.content.TotalConfirmed,
                        label: 'Total Confirmed',
                        fill: 'true'
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                },
                elements : {
                    line: {
                        tension: 0.000001
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'Total confirmed case'
                }
            }
        })
  }
//   co 2 data mot cai can phai sap thu tu dua theo data da duoc sort
  public content = {
    data: <any>{},
    countryCode:<any>{},
    sortedTotalConfirm:<any>{},
    TotalConfirmed:<any>{},
    getCountry: () => {
      this.countryService.getCountry().subscribe((resp: any) => {
        this.content.data = resp.Countries.slice(0,10)
        this.content.sortedTotalConfirm = this.content.data.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed ? -1 : 1))
        this.content.countryCode = this.content.sortedTotalConfirm.map((data: any)=> data.CountryCode)
        this.content.TotalConfirmed = this.content.sortedTotalConfirm.map((data: any)=> data.TotalConfirmed)
    })
    },
  }
}
