import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Place } from './place.model'

@Injectable({
	providedIn: 'root',
})
export class PlacesService {
	private _places: Place[] = [
		new Place(
			'p1',
			'Tahrir Mansion',
			'In the heart of the capital.',
			'https://img.youm7.com/ArticleImgs/2020/5/11/192112-WhatsApp-Image-2020-05-11-at-13.45.15-(1).jpeg',
			149.99,
			new Date(Date.now()),
			new Date('2021-12-30')
    ),
    new Place(
			'p2',
      'Alexandria room, on sea',
			'A romantic place in Alexandria.',
			'https://www.shorouknews.com/uploadedimages/Other/original/12249102.jpg',
			189.99
    ),
    new Place(
			'p3',
      'Chalet on Hurgada',
			'Has its own private pool.',
			'https://yallabook.com/guide/uploade/files/180124_c42644c4f4.jpg',
			249.99
		)
	]

	constructor(private authService: AuthService) {}
	getPlaces() {
		return [...this._places]
	}
	getPlace(id){
		const place = this._places.find(place =>place.id===id)
		if(place){
		return {...place}
	}
		return undefined
	}
	editPlace(id:string,title: string, description:string, price: number, startDate: Date, endDate: Date){
		const place = this._places.find(place =>place.id===id)
		if(place){
		place.title=title
		place.description=description
		place.price=price
		place.startDate=startDate
		place.endDate=endDate
		this._places=this._places.filter((place)=>{return place.id!==id})
		this._places.push(place)
	}
		return undefined
	}
	addPlace(title: string, description:string, price: number, startDate: Date, endDate: Date){
		const place = new Place(Math.random().toString(),title,description,undefined,price,startDate,endDate,this.authService.userId)
		this._places.push(place)

	}

}
