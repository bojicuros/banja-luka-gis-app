import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Building = db.define('building', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    geom: {
        type: DataTypes.GEOMETRY('POINT', 3908),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    date: {
        type: DataTypes.STRING(254),
        allowNull: true
    }
}, {
    tableName: 'buildings',
    timestamps: false
});

export default Building;