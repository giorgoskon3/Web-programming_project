import express from 'express';
import controller from '../controller/index_controller.mjs';

const router = express.Router();

// Home Route
router.get('/', controller.showHome);

// Job Seeker Routes
router.get('/job-seeker', controller.auth.checkAuthenticated, controller.auth.checkRole('job_seeker'), controller.jobSeeker.showJobSeeker);
router.get('/job-seeker/jobSearch', controller.jobSeeker.showJobSearch);
// router.get('/job-seeker/jobSearch/results', controller.searchJobs);
router.get('/job-seeker/savedJobs', controller.auth.checkAuthenticated, controller.auth.checkRole('job_seeker'), controller.jobSeeker.showSavedJobs);

// Employer Routes
router.get('/employer', controller.auth.checkAuthenticated, controller.auth.checkRole('employer'), controller.employer.showEmployer);
router.get('/employer/showPostNewJob', controller.auth.checkAuthenticated, controller.auth.checkRole('employer'),  controller.employer.showPostNewJob);
router.post('/employer/showPostNewJob/postNewJob', controller.auth.checkAuthenticated, controller.auth.checkRole('employer'), controller.employer.postNewJob);
router.get('/employer/postManagement', controller.auth.checkAuthenticated, controller.auth.checkRole('employer'), controller.employer.showPostManagement);
router.get('/employer/editCompanyProfile', controller.auth.checkAuthenticated, controller.auth.checkRole('employer'), controller.employer.showEditCompanyProfile);

// Communication Routes
router.get('/communicate', controller.communicate.showCommunicate);

// Authentication Routes
router.post('/login', controller.auth.doLogin);
router.post('/register', controller.auth.doRegister);
router.get('/logout', controller.auth.doLogout);

export default router;
