import { Place } from "../places/place.model";

export interface Booking {

		 id?: string,
         placeId: string,
         guestsCount: number,
		 startDate: string,
		 endDate: string,
		 owner: string,
		 place?: Place

}
