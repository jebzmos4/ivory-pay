// app.ts
import express from 'express';
import rateLimit from 'express-rate-limit'
import * as YAML from 'yamljs';  // Import yamljs package
import swaggerUi from 'swagger-ui-express';
import restaurantRouter from './restaurant.routes';
import * as path from "path";


const app = express();
const PORT = 3000;

// Enable rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});


app.use(express.json());
app.use(limiter); // Apply rate limiting to all routes

// Swagger setup
const swaggerFile = path.join(__dirname, 'swagger.yaml');
const swaggerDocument = YAML.load(swaggerFile);  // Use YAML.load to parse the YAML file
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(restaurantRouter);

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Restaurant API' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
