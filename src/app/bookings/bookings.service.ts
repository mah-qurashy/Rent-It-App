import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { PlacesService } from '../places/places.service'
import { Booking } from './booking.model'

@Injectable({
	providedIn: 'root',
})
export class BookingsService {
	constructor(
		private authService: AuthService,
		private firestore: AngularFirestore,
		private placesService: PlacesService
	) {}
	async getBookings() {
		const query = await this.firestore
			.collection('bookings')
			.ref.where('owner', '==', this.authService.userId)
			.get()
		let bookings = query.docs.map((doc) => {
			let booking = { ...(doc.data() as Booking) }
			booking.id = doc.id
			return booking
		})
		bookings.forEach(async (booking) => {
			booking.place = await this.placesService.getPlace(booking.placeId)
		})
		return [...bookings]
	}
	async getBooking(id) {
		const doc = await this.firestore
			.collection('bookings')
			.doc(id)
			.get()
			.toPromise()
		let booking = { ...(doc.data() as Booking) }
		booking.id = doc.id
		booking.place = await this.placesService.getPlace(booking.placeId)
		return booking
	}
	async editBooking(
		id: string,
		guestsCount: number,
		startDate: string,
		endDate: string
	) {
		await this.firestore
			.collection('bookings')
			.doc(id)
			.update({ guestsCount, startDate, endDate })
	}
	async deleteBooking(id: string) {
		return await this.firestore.collection('bookings').doc(id).delete()
	}
	async addBooking(
		placeId: string,
		guestsCount: number,
		startDate: string,
		endDate: string
	) {
		let booking: Booking = {
			placeId,
			guestsCount,
			startDate,
			endDate,
			owner: this.authService.userId,
		}

		return await this.firestore.collection('bookings').add(booking)
	}
}
