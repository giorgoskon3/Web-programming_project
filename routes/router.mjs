import express from 'express';
import * as controller from '../controller/controller.mjs';

const router = express.Router();

router.get('/', controller.showHome);
router.get('/job-seeker', controller.showJobSeeker);
router.get('/employer', controller.showEmployer);
router.get('/communicate', controller.showCommunicate);

export default router;
