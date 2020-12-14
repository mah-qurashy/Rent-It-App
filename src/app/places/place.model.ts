export class Place {

	constructor(
		public id: string,
		public title: string,
		public description: string,
		public imageUrl: string ="https://platinumplusrealtyky.com/wp-content/uploads/2019/06/HousePlaceholder-5.png",
		public price: number,
		public startDate: Date = undefined,
		public endDate: Date = undefined,
		public owner: string = undefined,

	) {}
}
