import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Place } from './place.model'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
	providedIn: 'root',
})
export class PlacesService {

	constructor(
		private authService: AuthService,
		private firestore: AngularFirestore
	) {}
	async getPlaces() {
		const query = await this.firestore.collection('places').get().toPromise()
		let places = query.docs.map((doc) => {
			let place = { ...(doc.data() as Place) }
			place.id = doc.id
			return place
		})
		return [...places]
	}
	async getOwnPlaces() {
		const query = await this.firestore
			.collection('places')
			.ref.where('owner', '==', this.authService.userId)
			.get()
		let places = query.docs.map((doc) => {
			let place = { ...(doc.data() as Place) }
			place.id = doc.id
			return place
		})
		return [...places]
	}
	async getBookablePlaces() {
		const query = await this.firestore
			.collection('places')
			.ref.where('owner', '!=', this.authService.userId)
			.get()
			let places = query.docs.map((doc) => {
				let place = { ...(doc.data() as Place) }
				place.id = doc.id
				return place
			})
			return [...places]
	}
	async getPlace(id) {
		const doc = await this.firestore
			.collection('places')
			.doc(id)
			.get()
			.toPromise()
		let place = { ...(doc.data() as Place) }
		place.id = doc.id
		return place
	}
	async editPlace(
		id: string,
		title: string,
		description: string,
		price: number,
		startDate: string,
		endDate: string
	) {
		await this.firestore
			.collection('places')
			.doc(id)
			.update({ title, description, price, startDate, endDate })
	}
	async deletePlace(id: string) {
		return await this.firestore.collection('places').doc(id).delete()
	}
	async addPlace(
		title: string,
		description: string,
		price: number,
		startDate: string,
		endDate: string
	) {
		let place: Place = {
			title,
			description,
			price,
			imageUrl:
				'https://platinumplusrealtyky.com/wp-content/uploads/2019/06/HousePlaceholder-5.png',
			owner: this.authService.userId,
		}
		if (startDate) {
			place.startDate = startDate
		}
		if (endDate) {
			place.endDate = startDate
		}

		return await this.firestore.collection('places').add(place)
	}
}
