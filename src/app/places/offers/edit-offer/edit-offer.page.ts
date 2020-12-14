import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AlertController, NavController } from '@ionic/angular'
import { Place } from '../../place.model'
import { PlacesService } from '../../places.service'

@Component({
	selector: 'app-edit-offer',
	templateUrl: './edit-offer.page.html',
	styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
	public offer: Place
	public todayDate = new Date(Date.now()).toISOString()

	constructor(
		private placesService: PlacesService,
		private activatedRoute: ActivatedRoute,
		private navController: NavController,
		private alertController: AlertController
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('placeId')) {
				this.navController.navigateBack('/places/tabs/offers')
				return
			}
			this.offer = this.placesService.getPlace(paramMap.get('placeId'))
			if (!this.offer) {
				this.navController.navigateBack('/places/tabs/offers')
				return
			}
		})
	}
	onSubmit(form: NgForm) {
		if (!form.valid) {
			return
		}
		const title = form.value.title
		const description = form.value.description
		//since dates are optional, if date is not entered set it as undefined
		let startDate: Date = undefined
		if (form.value.startdate !== '') {
			startDate = new Date(form.value.startdate)
		}
		let endDate: Date = undefined
		if (form.value.enddate !== '') {
			endDate = new Date(form.value.enddate)
		}
		const price = parseInt(form.value.price)
		this.placesService.editPlace(
			this.offer.id,
			title,
			description,
			price,
			startDate,
			endDate
		)
		this.navController.navigateBack('/places/tabs/offers')
	}
	onEditOffer() {}
	onDeleteOffer() {
		this.alertController.create({
			header: 'Delete offer?',
			message: 'Do you really want to delete this offer?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'medium'
				},
				{
					text: 'Delete',
					role: 'delete',
					handler: () => {
						this.placesService.deletePlace(this.offer.id)
						this.navController.navigateBack('/places/tabs/offers')
					},
				},
			],
		}).then((alert)=>{alert.present()})
	}
}
