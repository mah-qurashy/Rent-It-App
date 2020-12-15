import { Component, OnInit } from '@angular/core'
import { LoadingController, ModalController, NavController } from '@ionic/angular'
import { PlacesService } from '../../places.service'
import { Place } from '../../place.model'
import { ActivatedRoute } from '@angular/router'
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component'

@Component({
	selector: 'app-place-details',
	templateUrl: './place-details.page.html',
	styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
	place: Place

	constructor(
		private navController: NavController,
		private placesService: PlacesService,
		private activatedRoute: ActivatedRoute,
		private modalController: ModalController,
	) {}

	onBookPlace() {
		this.modalController
			.create({
				component: CreateBookingComponent,
				componentProps: { place: this.place },
			})
			.then((modal) => modal.present())
	}
	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(async (paramMap) => {
			if (!paramMap.has('placeId')) {
				this.navController.navigateBack('/places/tabs/offers')
				return
			}
			this.place = await this.placesService.getPlace(paramMap.get('placeId'))
			console.log(this.place)
			if (!this.place) {
				this.navController.navigateBack('/places/tabs/offers')
				return
			}
		})
	}
}
