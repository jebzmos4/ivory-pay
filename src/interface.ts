export interface Restaurant {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    cuisine?: string;
    price_range?: any;
    rating: number;
}
