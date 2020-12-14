export class Booking {

	constructor(
		public id: string,
        public placeId: string,
        public guestsCount: number,
		public startDate: Date = undefined,
		public endDate: Date = undefined,
		public owner: string = undefined,

	) {}
}
