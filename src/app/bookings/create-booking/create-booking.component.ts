import { CurrencyPipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ModalController, NavController } from '@ionic/angular'
import { Booking } from '../booking.model'
import { Place } from '../../places/place.model'
import { BookingsService } from '../bookings.service'

@Component({
	selector: 'app-create-booking',
	templateUrl: './create-booking.component.html',
	styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
	@Input() place: Place
	currentCostText = 'Pick date to calculate cost'
	startDate: string
	startDateMin: string = new Date(Date.now()).toISOString()
	startDateMax: string = new Date('2050-01-01').toISOString()
	endDate: string
	endDateMin: string = new Date(Date.now()).toISOString()
	endDateMax: string = new Date('2050-01-01').toISOString()
	constructor(
		private modalController: ModalController,
		private navController: NavController,
		private bookingsService: BookingsService
	) {}

	ngOnInit() {
		if (this.place.startDate) {
			if (new Date(this.place.startDate) > new Date(this.startDateMin)) {
				this.startDateMin = this.place.startDate
				this.endDateMin = this.place.startDate
			}
		}
		if (this.place.endDate) {
			this.startDateMax = this.place.endDate
			this.endDateMax = this.place.endDate
		}
		console.log(this.startDateMin, this.startDateMax)
	}

	onStartDateChange(event: CustomEvent) {
		if (event.detail.value) {
			this.startDate = event.detail.value
			const selectedDate = this.startDate
			if (this.place.startDate) {
				if (new Date(selectedDate) > new Date(this.place.startDate)) {
					this.endDateMin = selectedDate
				}
			} else {
				this.endDateMin = selectedDate
			}

			if (this.endDate) {
				this.caclulateCost(this.startDate, this.endDate)
			}
		}
	}
	onEndDateChange(event: CustomEvent) {
		if (event.detail.value) {
			this.endDate = event.detail.value
			const selectedDate = this.endDate
			if (this.place.endDate) {
				if (new Date(selectedDate) < new Date(this.place.endDate)) {
					this.startDateMax = selectedDate
				}
			} else {
				this.startDateMax = selectedDate
			}
			if (this.startDate) {
				this.caclulateCost(this.startDate, this.endDate)
			}
		}
	}
	onBookPlace() {}
	onCancel() {
		this.modalController.dismiss({ message: 'booked' }, 'confirm')
	}
	caclulateCost(ds1: string, ds2: string) {
		let d1 = new Date(ds1)
		let d2 = new Date(ds2)
		let diff = Math.floor(
			Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
		)
		if (diff <= 0) {
			diff = 1
		}
		this.currentCostText = 'Total Cost = ' + diff * this.place.price
	}
	onSubmit(form: NgForm) {
		if (!form.valid) {
			return
		}
		const guestsCount = form.value.numberofguests
		let startDate = form.value.startdate

		let endDate = form.value.enddate
		const price = parseInt(form.value.price)
		this.bookingsService.addBooking(
			this.place.id,
			guestsCount,
			startDate,
			endDate
		)
		this.modalController.dismiss({ message: 'booked' }, 'confirm')
	}
	formatDate(string) {
		return new Date(string).toLocaleDateString()
	}
}
