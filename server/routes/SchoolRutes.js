import express from 'express';
import SchoolController from '../controller/SchoolController.js';

const router = express.Router();

router.get('/', SchoolController.getAllSchools);
router.get('/:id', SchoolController.getSchoolById);
router.get('/name/:name', SchoolController.getSchoolByName);
router.post('/', SchoolController.createSchool);
router.put('/:id', SchoolController.updateSchool);
router.delete('/:id', SchoolController.deleteSchool);

export default router;