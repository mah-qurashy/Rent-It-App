import { Component, OnInit } from '@angular/core'
import { LoadingController } from '@ionic/angular'
import { Place } from '../place.model'
import { PlacesService } from '../places.service'

@Component({
	selector: 'app-offers',
	templateUrl: './offers.page.html',
	styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
	public offers: Place[]

	constructor(
		private placesService: PlacesService,
	) {}
	async ionViewWillEnter() {
		this.offers = await this.placesService.getOwnPlaces()
	}

	async ngOnInit() {
		this.offers = await this.placesService.getOwnPlaces()
	}
	formatDate(string) {
		return new Date(string).toLocaleDateString()
	}
}
