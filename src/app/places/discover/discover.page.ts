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
	allPlaces: Place[]=[]
	bookablePlaces: Place[]=[]
	state: 'all' | 'bookable' = 'all'
	isAuthenticated: boolean
	private exitSubcription: Subscription

	constructor(
		private placesService: PlacesService,
		private platform: Platform
	) {}
	async ionViewWillEnter(){
		this.allPlaces = await this.placesService.getPlaces()
		this.bookablePlaces = await this.placesService.getBookablePlaces()
		if(this.state==='all'){
			this.places=this.allPlaces
		}
		if(this.state==='bookable'){
			this.places=this.bookablePlaces
		}
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
		this.allPlaces = await this.placesService.getPlaces()
		this.bookablePlaces = await this.placesService.getBookablePlaces()
	}
	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
		if (event.detail.value==='all'){
			this.places=this.allPlaces
			this.state='all'
		}
		if (event.detail.value==='bookable'){
			this.places=this.bookablePlaces
			this.state='bookable'
		}

	}
}
