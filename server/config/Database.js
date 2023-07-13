import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

export default db;