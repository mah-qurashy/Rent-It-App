import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AlertController, LoadingController, NavController } from '@ionic/angular'
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
		private alertController: AlertController,
		private loadingController: LoadingController
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(async (paramMap) => {
			if (!paramMap.has('placeId')) {
				this.navController.navigateBack('/places/tabs/offers')
				return
			}
			 this.offer = await this.placesService.getPlace(paramMap.get('placeId'))
			if (!this.offer) {
				this.navController.navigateBack('/places/tabs/offers')
				return
			}
		})
	}
	async onSubmit(form: NgForm) {
		if (!form.valid) {
			return
		}
		const title = form.value.title
		const description = form.value.description

		let	startDate = form.value.startdate
		let endDate =  form.value.enddate
		const price = parseInt(form.value.price)
		this.loadingController.create({message: "Editing.."}).then(element=>element.present())
		await this.placesService.editPlace(
			this.offer.id,
			title,
			description,
			price,
			startDate,
			endDate
		)
		this.loadingController.dismiss()
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
						this.deletePlace(this.offer.id)
					},
				},
			],
		}).then((alert)=>{alert.present()})
	}
	async deletePlace(id:  string){
		this.loadingController.create({message: "Deleting.."}).then(element=>element.present())
		await this.placesService.deletePlace(id)
		this.loadingController.dismiss()
		this.navController.navigateBack('/places/tabs/offers')

	}
	
}
