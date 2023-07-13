import School from '../model/School.js';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

class SchoolController {
    async getAllSchools(req, res) {
        try {
            const schools = await School.findAll({
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'addr_street',
                    'name',
                    'addr_house'
                ],
            });
            res.status(200).json({ schools: schools });
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getSchoolById(req, res) {
        const { id } = req.params;
        try {
            const school = await School.findByPk(id, {
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'addr_street',
                    'name',
                    'addr_house'
                ],
            });
            if (school) {
                res.status(200).json({ school: school });
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async getSchoolByName(req, res) {
        const { name } = req.params;
        try {
            const school = await School.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                attributes: [
                    'id',
                    [Sequelize.fn('ST_AsText', Sequelize.fn('ST_Transform', Sequelize.col('geom'), 4326)), 'coordinates'],
                    'addr_street',
                    'name',
                    'addr_house'
                ],
            });
            if (school) {
                res.status(200).json({ school: school });
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async createSchool(req, res) {
        const { geometry, addr_street, name, addr_house } = req.body;
        try {
          const school = await School.create({
            geom: Sequelize.fn('ST_Transform', Sequelize.fn('ST_GeomFromText', geometry, 4326), 3908),
            addr_street: addr_street,
            name: name,
            addr_house: addr_house
          });
          res.status(201).json({ school: school });
        } catch (error) {
          res.sendStatus(400);
        }
      }
      
      async updateSchool(req, res) {
        const { id } = req.params;
        const { geometry, addr_street, name, addr_house } = req.body;
        try {
          const school = await School.findByPk(id);
          if (school) {
            await school.update({
              geom: Sequelize.fn('ST_Transform', Sequelize.fn('ST_GeomFromText', geometry, 4326), 3908),
              addr_street: addr_street,
              name: name,
              addr_house: addr_house
            });
            res.status(200).json({ school: school });
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          res.sendStatus(400);
        }
      }
      
    async deleteSchool(req, res) {
        const { id } = req.params;
        try {
            const school = await School.findByPk(id);
            if (school) {
                await school.destroy();
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(400);
        }
    }
}

export default new SchoolController();
