import { CountryService } from './../../../service/country.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cdk-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.legend.getCountry()
  }
  public legend = {
    data: <any>{},
    countryCode:<any>{},
    sortedLegend:<any>{},
    getCountry: () => {
      this.countryService.getCountry().subscribe((resp: any) => {
        this.legend.data = resp.Countries.slice(0,10)
        this.legend.sortedLegend = this.legend.data.sort((a, b) => (a.TotalDeaths > b.TotalDeaths ? -1 : 1))
        
    })
    },
  }
}
