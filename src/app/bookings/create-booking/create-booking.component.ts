import { CurrencyPipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { Place } from 'src/app/places/place.model'

@Component({
	selector: 'app-create-booking',
	templateUrl: './create-booking.component.html',
	styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
	@Input() place: Place
	currentCostText = 'Pick date to calculate cost'
	startDate: string
	startDateMin: Date = new Date(Date.now())
	startDateMax: Date = new Date('2050-01-01')
	endDate: string
	endDateMin: Date = new Date(Date.now())
	endDateMax: Date = new Date('2050-01-01')
	constructor(private modalController: ModalController) {}

	ngOnInit() {
		if (this.place.startDate) {
			if (this.place.startDate < this.startDateMin) {
				this.startDateMin = this.place.startDate
				this.endDateMin = this.place.startDate
			}
		}
		if (this.place.endDate) {
			this.startDateMax = this.place.endDate
			this.endDateMax = this.place.endDate
		}
	}

	onStartDateChange(event: CustomEvent) {
		if (event.detail.value) {
			this.startDate = event.detail.value
			const selectedDate = new Date(this.startDate)
			if (this.place.startDate) {
				if (selectedDate > this.place.startDate) {
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
			const selectedDate = new Date(this.endDate)
			if (this.place.endDate) {
				if (selectedDate < this.place.endDate) {
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
	onBookPlace() {
		this.modalController.dismiss(null, 'cancel')
	}
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
		const startDate = form.value.startdate
		const endDate = form.value.enddate
	}
}
