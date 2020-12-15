import { Component, OnInit } from '@angular/core'
import { PlacesService } from '../places.service'
import { Place } from '../place.model'
import { SegmentChangeEventDetail } from '@ionic/core'
import { Subscription } from 'rxjs'
import { Platform } from '@ionic/angular'

@Component({
	selector: 'app-discover',
	templateUrl: './discover.page.html',
	styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
	places: Place[] = []
	isAuthenticated: boolean
	private exitSubcription: Subscription

	constructor(
		private placesService: PlacesService,
		private platform: Platform
	) {}
	async ionViewWillEnter(){
		this.places = await this.placesService.getPlaces()
	}
	//hardware back button exits app on phones
	ionViewDidEnter() {
		this.exitSubcription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp()
		})
	}
	ionViewWillLeave() {
		this.exitSubcription.unsubscribe()
	}

	async ngOnInit() {
		this.places = await this.placesService.getPlaces()
	}
	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {}
}
