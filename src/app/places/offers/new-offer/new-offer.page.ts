import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LoadingController, NavController } from '@ionic/angular'
import { PlacesService } from '../../places.service'

@Component({
	selector: 'app-new-offer',
	templateUrl: './new-offer.page.html',
	styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
	todayDate = new Date(Date.now()).toISOString()
	constructor(
		private placesService: PlacesService,
		private navController: NavController,
		private  loadingController: LoadingController
	) {}

	ngOnInit() {}
	async onSubmit(form: NgForm) {
		if (!form.valid) {
			return
		}
		const title = form.value.title
		const description = form.value.description
		let startDate = form.value.startdate

		let endDate = form.value.enddate

		const price = parseInt(form.value.price)
		this.loadingController.create({message: "Adding.."}).then(element=>element.present())
		await this.placesService.addPlace(title, description, price, startDate, endDate)
		this.loadingController.dismiss()
		this.navController.navigateBack('/places/tabs/offers')
	}
}
