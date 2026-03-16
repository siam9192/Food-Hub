export type Provider = {
	address: string;
	id: string;
	name: string;
	description?: string;
	image?: string;
	avgRating:number
	isOpen: boolean;
	mealsCount: number;
};
