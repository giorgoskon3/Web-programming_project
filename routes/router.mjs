import express from 'express';
import * as controller from '../controller/controller.mjs';

const router = express.Router();

router.get('/', controller.showHome);
router.get('/job-seeker', controller.showJobSeeker);
router.get('/job-seeker/jobSearch', controller.showJobSearch);
// router.get('/job-seeker/jobSearch/results', controller.searchJobs);
// router.get('/job-seeker/savedJobs', controller.showSavedJobs);

router.get('/employer', controller.showEmployer);
router.get('/communicate', controller.showCommunicate);

export default router;
