import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Booking } from './booking.model'

@Injectable({
	providedIn: 'root',
})
export class BookingsService {
	private _bookings: Booking[] = []

	constructor(private authService: AuthService) {}
	getBookings() {
		return [...this._bookings]
	}
	getBooking(id) {
		const booking = this._bookings.find((booking) => booking.id === id)
		if (booking) {
			return { ...booking }
		}
		return undefined
	}
	editBooking() {
    //TODO:
  }
	deletePlace(id: string) {
		const booking = this._bookings.find((booking) => booking.id === id)
		if (booking) {
			this._bookings = this._bookings.filter((booking) => {
				return booking.id !== id
			})
		}
	}
	addBooking(
		placeId: string,
		guestsCount: number,
		startDate: Date,
		endDate: Date
	) {
		const booking = new Booking(
			Math.random().toString(),
			placeId,
			guestsCount,
			startDate,
			endDate,
			this.authService.userId
		)
		this._bookings.push(booking)
	}
}
