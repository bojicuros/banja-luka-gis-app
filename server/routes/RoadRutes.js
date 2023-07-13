import express from 'express';
import RoadController from '../controller/RoadController.js'

const router = express.Router();

router.get('/', RoadController.getAllRoads);
router.get('/:id', RoadController.getRoadById);
router.post('/', RoadController.createRoad);
router.put('/:id', RoadController.updateRoad);
router.delete('/:id', RoadController.deleteRoad);

export default router;