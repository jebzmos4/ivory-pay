// route.ts
import express from 'express';
import { RestaurantController } from './restaurant.controller';

const router = express.Router();

router.get('/v1/restaurants', RestaurantController.getNearbyRestaurants);
router.get('/v1/restaurants/:id', RestaurantController.getRestaurantById); // New endpoint
router.post('/v1/restaurants', RestaurantController.addRestaurant); // New endpoint
router.put('/v1/restaurants/:id', RestaurantController.updateRestaurant); // New endpoint
router.delete('/v1/restaurants/:id', RestaurantController.deleteRestaurant);

export default router;
