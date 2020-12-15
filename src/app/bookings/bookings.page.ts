import { Component, OnInit } from '@angular/core'
import { AlertController, LoadingController, NavController } from '@ionic/angular'
import { Place } from '../places/place.model'
import { PlacesService } from '../places/places.service'
import { Booking } from './booking.model'
import { BookingsService } from './bookings.service'

@Component({
	selector: 'app-bookings',
	templateUrl: './bookings.page.html',
	styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
	public bookings: Booking[]

	constructor(
    private bookingsService: BookingsService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController : NavController
	) {}

	async ngOnInit() {
    this.bookings = await this.bookingsService.getBookings()
    console.log(this.bookings)
	}
	async ionViewWillEnter() {
    this.bookings = await this.bookingsService.getBookings()

  }
  async onCancelBooking(id: string){
    this.alertController.create({
			header: 'Cancel booking?',
			message: 'Do you really want to cancel this booking?',
			buttons: [
				{
					text: 'Return',
					role: 'cancel',
					cssClass: 'medium'
				},
				{
					text: 'Cancel Booking',
					role: 'delete',
					handler: () => {
						this.deleteBooking(id)
					},
				},
			],
		}).then((alert)=>{alert.present()})


  }
  async deleteBooking(id){
    this.loadingController.create({message: "cancelling.."}).then(element=>element.present())
		await this.bookingsService.deleteBooking(id)
    this.loadingController.dismiss()
    //reupdate list
    this.bookings=await this.bookingsService.getBookings()
  }
  formatDate(string) {
		return new Date(string).toLocaleDateString()
	}
}
