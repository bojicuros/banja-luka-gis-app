import express from 'express';
import BuildingController from '../controller/BuildingController.js';

const router = express.Router();

router.get('/', BuildingController.getAllBuildings);
router.get('/school', BuildingController.getNewSchoolLocation);
router.get('/:id', BuildingController.getBuildingById);
router.get('/type/:type', BuildingController.getBuildingByType);
router.post('/', BuildingController.createBuilding);
router.put('/:id', BuildingController.updateBuilding);
router.delete('/:id', BuildingController.deleteBuilding);

export default router;