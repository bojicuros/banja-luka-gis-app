import Road from '../model/Road.js';
import { Sequelize } from 'sequelize';

class RoadController {
    async getAllRoads(req, res) {
        try {
            const roads = await Road.findAll({
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'label',
                    'num_of_vehicles'
                ],
            });
            res.status(200).json({ roads: roads });
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getRoadById(req, res) {
        const { id } = req.params;
        try {
            const road = await Road.findByPk(id, {
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'label',
                    'num_of_vehicles'
                ],
            });
            if (road) {
                res.status(200).json({ road: road });
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async createRoad(req, res) {
        const { geom, label, num_of_vehicles } = req.body;
        try {
            const road = await Road.create({
                geom: geom,
                label: label,
                num_of_vehicles: num_of_vehicles
            });
            const transformedRoad = await Road.findByPk(road.id, {
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'label',
                    'num_of_vehicles'
                ],
            });
            res.status(201).json({ road: transformedRoad });
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async updateRoad(req, res) {
        const { id } = req.params;
        const { geom, label, num_of_vehicles } = req.body;
        try {
            const road = await Road.findByPk(id);
            if (road) {
                await road.update({
                    geom: geom,
                    label: label,
                    num_of_vehicles: num_of_vehicles
                });
                const updatedRoad = await Road.findByPk(id, {
                    attributes: [
                        'id',
                        [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                        'label',
                        'num_of_vehicles'
                    ],
                });
                res.status(200).json({ road: updatedRoad });
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async deleteRoad(req, res) {
        const { id } = req.params;
        try {
            const road = await Road.findByPk(id);
            if (road) {
                await road.destroy();
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }
}

export default new RoadController();
