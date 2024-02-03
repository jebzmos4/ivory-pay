// app.ts
import express from 'express';
import rateLimit from 'express-rate-limit';
import restaurantRouter from './restaurant.routes';

const app = express();
const PORT = 3000;

// Enable rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});


app.use(express.json());
app.use(limiter); // Apply rate limiting to all routes
app.use(restaurantRouter);

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Restaurant API' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
