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
	constructor(private placesService: PlacesService, private navController: NavController) {}

	ngOnInit() {}
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
		this.placesService.addPlace(title, description, price, startDate, endDate)
		this.navController.navigateBack('/places/tabs/offers')
	}
}
