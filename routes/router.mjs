import express from 'express';
import controller from '../controller/index_controller.mjs';
const { checkAuthenticated, checkRole } = controller.auth;

const router = express.Router();

// Home
router.get('/', controller.showHome);

// --- Job Seeker Routes ---
router.get('/job-seeker', checkAuthenticated, checkRole('job_seeker'), controller.jobSeeker.showJobSeeker);

router.get('/job-seeker/jobSearch', controller.jobSeeker.showJobSearch);
// router.get('/job-seeker/jobSearch/results', controller.searchJobs);
router.get('/job-seeker/savedJobs', controller.jobSeeker.showSavedJobs);

// Employer Routes
router.get('/employer', controller.employer.showEmployer);
router.get('/employer/showPostNewJob', controller.employer.showPostNewJob);
router.post('/employer/showPostNewJob/postNewJob', controller.employer.postNewJob);
router.get('/employer/postManagement', controller.employer.showPostManagement);
router.get('/employer/editCompanyProfile', controller.employer.showEditCompanyProfile);

// Communication Routes
router.get('/communicate', controller.communicate.showCommunicate);

// Authentication Routes
router.post('/login', controller.auth.doLogin);
router.post('/register', controller.auth.doRegister);
router.get('/logout', controller.auth.doLogout);

export default router;
