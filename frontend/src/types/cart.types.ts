export type CartItem = {
	providerId: string;
	mealId: string;
	image:string,
	name: string;
	price: number;
	quantity: number;
	selected?:boolean
};

export interface CartContextType {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	addToCart: (item: CartItem) => void;
	removeFromCart: (mealId: string) => void;
	updateQuantity: (mealId: string, quantity: number) => void;
	selectItems:(mealIds:string[])=>void,
	unselectItems:(mealIds:string[])=>void,
	clearCart: () => void;
}
