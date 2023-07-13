import Building from '../model/Building.js';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

class BuildingController {
    async getAllBuildings(req, res) {
        try {
            const buildings = await Building.findAll({
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'type',
                    'date'
                ],
            });
            res.status(200).json({ buildings: buildings });
        } catch (error) {
            res.sendStatus(400);
        }
    }    

    async getBuildingById(req, res) {
        const { id } = req.params;
        try {
            const building = await Building.findByPk(id, {
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'type',
                    'date'
                ],
            });
            if (building) {
                res.status(200).json({ building: building });
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getBuildingByType(req, res) {
        const { type } = req.params;
        try {
            const buildings = await Building.findAll({
                where: {
                    type: {
                        [Op.iLike]: `%${type}%`
                    }
                },
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'type',
                    'date'
                ],
            });
            if (buildings.length > 0) {
                res.status(200).json({ buildings: buildings });
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getAllBuildingsByType(req, res) {
        const { type } = req.params;
        try {
            const buildings = await Building.findAll({
                where: {
                    type: {
                        [Op.iLike]: `%${type}%`
                    }
                },
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'type',
                    'date'
                ],
            });
            res.status(200).json({ buildings: buildings });
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async createBuilding(req, res) {
        const { geometry, type, date } = req.body;
        try {
          const building = await Building.create({
            geom: Sequelize.fn('ST_Transform', Sequelize.fn('ST_GeomFromText', geometry, 4326), 3908),
            type,
            date,
          });
          res.status(201).json({ building });
        } catch (error) {
          console.error('Error creating building:', error);
          res.sendStatus(400);
        }
      }
    
      async updateBuilding(req, res) {
        const { id } = req.params;
        const { geometry, type, date } = req.body;
        try {
          const building = await Building.findByPk(id);
          if (building) {
            await building.update({
              geom: Sequelize.fn('ST_Transform', Sequelize.fn('ST_GeomFromText', geometry, 4326), 3908),
              type,
              date,
            });
            const updatedBuilding = await Building.findByPk(id, {
              attributes: [
                'id',
                [Sequelize.fn('ST_AsText', Sequelize.col('geom')), 'coordinates'],
                'type',
                'date',
              ],
            });
            res.status(200).json({ building: updatedBuilding });
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          res.sendStatus(400);
        }
      }    


    async deleteBuilding(req, res) {
        const { id } = req.params;
        try {
            const building = await Building.findByPk(id);
            if (building) {
                await building.destroy();
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getNewSchoolLocation(req, res) {
        const { param1, param2, param3, param4 } = req.query;
        try {
          const building = await Building.findOne({
            attributes: [
              [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'school_location']
            ],
            where: {
              type: 'Stambena',
              [Sequelize.Op.and]: [
                Sequelize.literal(`EXISTS (
                  SELECT 1
                  FROM roads AS r
                  WHERE ST_DWithin(building.geom, r.geom, ${param1})
                )`),
                Sequelize.literal(`NOT EXISTS (
                  SELECT 1
                  FROM schools AS s
                  WHERE ST_Distance(building.geom, s.geom) <= ${param2}
                )`),
                Sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM buildings AS b2
                  WHERE b2.type = 'Stambena'
                  AND ST_Distance(building.geom, b2.geom) <= ${param3}
                ) >= ${param4}`)
              ]
            },
            limit: 1
          });
      
          if (building) {
            res.status(200).json({ building: building });
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          res.sendStatus(400);
        }
      }
      
}

export default new BuildingController();