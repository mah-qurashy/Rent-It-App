export class Place {
    public startDate: Date
    public endDate: Date
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public imageUrl: string,
        public price: number,

	) {}
}
