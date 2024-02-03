// controller.ts
import { Request, Response } from 'express';
import { RestaurantService } from './restaurant.service';
import {Restaurant} from "./interface";

export class RestaurantController {
    static getNearbyRestaurants(req: Request, res: Response): void {
        const { city, latitude, longitude, distance, cuisine, price_range, min_rating } = req.query;

        if (!city) {
            res.status(404).json({ error: 'City not provided or not supported' });
            return;
        }

        if (!latitude || !longitude || isNaN(parseFloat(latitude as string)) || isNaN(parseFloat(longitude as string))) {
            res.status(400).json({ error: 'Invalid or missing user coordinates' });
            return;
        }

        if (!distance || isNaN(parseFloat(distance as string)) || parseFloat(distance as string) < 0) {
            res.status(400).json({ error: 'Invalid or missing distance' });
            return;
        }

        if (!city || !latitude || !longitude || !distance) {
            res.status(400).json({ error: 'Missing required parameters' });
            return;
        }

        const nearbyRestaurants = RestaurantService.getNearbyRestaurants(
            city as string,
            parseFloat(latitude as string),
            parseFloat(longitude as string),
            parseFloat(distance as string),
            cuisine as string, parseInt(price_range as string), parseInt(min_rating as string)
        );

        res.json({ restaurants: nearbyRestaurants });
    }

    static getRestaurantById(req: Request, res: Response): void {
        const { id } = req.params;

        const restaurant = RestaurantService.getRestaurantById(parseInt(id, 10));

        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }

        res.json(restaurant);
    }

    static addRestaurant(req: Request, res: Response): void {
        const newRestaurant: Restaurant = req.body;

        const addedRestaurant = RestaurantService.addRestaurant(newRestaurant);

        res.status(201).json(addedRestaurant);
    }

    static updateRestaurant(req: Request, res: Response): void {
        const { id } = req.params;
        const updatedRestaurant: Restaurant = req.body;

        const result = RestaurantService.updateRestaurant(parseInt(id, 10), updatedRestaurant);

        if (!result) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }

        res.json(result);
    }

    static deleteRestaurant(req: Request, res: Response): void {
        const { id } = req.params;

        const result = RestaurantService.deleteRestaurant(parseInt(id, 10));

        if (!result) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }

        res.json({ response: 'restaurant deleted' });
    }
}
