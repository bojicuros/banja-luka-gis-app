import cors from 'cors';
import { config } from 'dotenv';
import express, { urlencoded } from 'express';
import db from './config/Database.js';
import roads from './routes/RoadRutes.js'
import buildings from './routes/BuildingRutes.js'
import schools from './routes/SchoolRutes.js'

const app = express();
const PORT = process.env.PORT || 8080;

(async () => {
    try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}})();


config();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use('/roads', roads);
app.use('/buildings', buildings);
app.use('/schools', schools);


app.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});