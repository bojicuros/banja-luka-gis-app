import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Road = db.define('road', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    geom: {
        type: DataTypes.GEOMETRY('MULTILINESTRING', 3908),
        allowNull: false
    },
    label: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    num_of_vehicles: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'roads',
    timestamps: false
});

export default Road;
