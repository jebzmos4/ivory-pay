// service.ts
import { Restaurant } from './interface';

export class RestaurantService {
    private static restaurants: Restaurant[] = [
        {
            id: 1,
            name: 'Cafe Delight',
            address: '123 Main St, New York, NY',
            latitude: 40.7112,
            longitude: -74.0055,
        },
        {
            id: 2,
            name: 'Pasta Paradise',
            address: '456 Elm St, New York, NY',
            latitude: 40.7145,
            longitude: -74.0082,
        },
        // Add more restaurants as needed
    ];

    static getNearbyRestaurants(
        city: string,
        latitude: number,
        longitude: number,
        distance: number
    ): Restaurant[] {
        const userLocation = { latitude, longitude };

        return this.restaurants.filter((restaurant) => {
            const restaurantDistance = this.calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                restaurant.latitude,
                restaurant.longitude
            );

            return (
                restaurantDistance <= distance &&
                city.toLowerCase() === 'new york' // Add additional city validation as needed
            );
        });
    }

    private static calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        // Implementation of the distance calculation function
        // ...
        return 0;
    }

    static getRestaurantById(id: number): Restaurant | undefined {
        return this.restaurants.find((restaurant) => restaurant.id === id);
    }

    static addRestaurant(newRestaurant: Restaurant): Restaurant {
        const id = this.generateId();
        const restaurantWithId = { ...newRestaurant, id };
        this.restaurants.push(restaurantWithId);
        return restaurantWithId;
    }

    static updateRestaurant(id: number, updatedRestaurant: Restaurant): Restaurant | undefined {
        const index = this.restaurants.findIndex((restaurant) => restaurant.id === id);

        if (index !== -1) {
            this.restaurants[index] = { ...this.restaurants[index], ...updatedRestaurant };
            return this.restaurants[index];
        }

        return undefined;
    }

    static deleteRestaurant(id: number): boolean {
        const initialLength = this.restaurants.length;
        this.restaurants = this.restaurants.filter((restaurant) => restaurant.id !== id);
        return this.restaurants.length !== initialLength;
    }

    private static generateId(): number {
        const existingIds = this.restaurants.map((restaurant) => restaurant.id);
        const newId = Math.max(...existingIds, 0) + 1;
        return newId;
    }
}
