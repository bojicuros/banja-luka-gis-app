import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const School = db.define('school', {
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
    addr_street: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(254),
        allowNull: true
    },
    addr_house: {
        type: DataTypes.STRING(254),
        allowNull: true
    }
}, {
    tableName: 'schools',
    timestamps: false
});

export default School;
