import { DetailService } from './../../../service/detail.service';
import { Component, OnInit, Input } from '@angular/core';
declare const AmCharts;
@Component({
	selector: 'cdk-world-map',
	templateUrl: './world-map.component.html',
	styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

	@Input() tableData = [];
	constructor(public detailService: DetailService) { }

	ngOnInit() {
		this.content.getDetail()
	}
	public content = {
		data: <any>{},
		sorted: <any>{},
		countryCode: <any>{},
		sortedTotalConfirm: <any>{},
		capital: <any>{},
		TotalConfirmed: <any>{},
		getDetail: () => {
			this.detailService.getDetail().subscribe((resp: any) => {
				this.content.data = resp.slice(0, 20)
				this.content.sorted = this.data(resp)
			})
		},
	}
	data(name: string) {
		this.content.data.find(x => x.name === name)
	}
	search = false;
	searchstats(name: any) {
		this.search = !this.search
		this.content.capital = this.content.data.find(x => x.name === name)
	}
}
