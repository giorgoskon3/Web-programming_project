import express from 'express';
import controller from '../controller/index_controller.mjs';

const router = express.Router();

// Home
router.get('/', controller.showHome);

// Job Seeker Routes
router.get('/job-seeker', controller.jobSeeker.showJobSeeker);
router.get('/job-seeker/jobSearch', controller.jobSeeker.showJobSearch);
router.get('/job-seeker/savedJobs', controller.jobSeeker.showSavedJobs);
router.post('/job-seeker/saveJob', controller.jobSeeker.saveJob);
router.post('/job-seeker/savedJobs/remove/:jobId', controller.jobSeeker.removeSavedJob);




// Employer Routes
router.get('/employer', controller.employer.showEmployer);
router.get('/employer/showPostNewJob', controller.employer.showPostNewJob);
router.post('/employer/showPostNewJob/postNewJob', controller.employer.postNewJob);
router.get('/employer/postManagement', controller.employer.showPostManagement);
router.get('/employer/postManagement/editJob/:jobId', controller.employer.showEditJob);
router.post('/employer/postManagement/editJob/:jobId', controller.employer.editJob);
router.post('/employer/postManagement/deleteJob/:jobId', controller.employer.deleteJob);

// Communication Routes
router.get('/communicate', controller.communicate.showCommunicate);

export default router;
