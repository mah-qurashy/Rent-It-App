import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Place } from '../../place.model'
import { PlacesService } from '../../places.service'

@Component({
	selector: 'app-edit-offer',
	templateUrl: './edit-offer.page.html',
	styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
	public offer: Place
	public todayDate=new Date(Date.now()).toISOString()

	constructor(
		private placesService: PlacesService,
		private activatedRoute: ActivatedRoute,
		private navController: NavController
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
	onSubmit(form:NgForm){
	  if (!form.valid){
		return
	  }
	  const title=form.value.title
	  const description=form.value.description
	  const startDate=form.value.startdate
	  const endDate=form.value.enddate
	  const price=form.value.price
	}
	onEditOffer(){}
	onDeleteOffer(){}
}
