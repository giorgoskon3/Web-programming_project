import express from 'express';
import controller from '../controller/index_controller.mjs';
const { checkAuthenticated, checkRole } = controller.auth;

const router = express.Router();

// Home Route
router.get('/', controller.showHome);

// --- Job Seeker Routes ---
router.get('/job-seeker', checkAuthenticated, checkRole('job_seeker'), controller.jobSeeker.showJobSeeker);

router.get('/job-seeker/jobSearch', controller.jobSeeker.showJobSearch);

router.get('/job-seeker/savedJobs', checkAuthenticated, checkRole('job_seeker'), controller.jobSeeker.showSavedJobs);

// --- Employer Routes ---
router.get('/employer', checkAuthenticated, checkRole('employer'), controller.employer.showEmployer);

router.get('/employer/showPostNewJob', checkAuthenticated, checkRole('employer'), controller.employer.showPostNewJob);

router.post('/employer/showPostNewJob/postNewJob', checkAuthenticated, checkRole('employer'), controller.employer.postNewJob);

router.get('/employer/postManagement', checkAuthenticated, checkRole('employer'), controller.employer.showPostManagement);

router.get('/employer/postManagement/editJob/:jobId', checkAuthenticated, checkRole('employer'), controller.employer.showEditJob);

router.post('/employer/postManagement/editJob/:jobId', checkAuthenticated, checkRole('employer'), controller.employer.editJob);

router.post('/employer/postManagement/deleteJob/:jobId', checkAuthenticated, checkRole('employer'), controller.employer.deleteJob);

router.get('/employer/editCompanyProfile', checkAuthenticated, checkRole('employer'), controller.employer.showEditCompanyProfile);

// Communication Routes
router.get('/communicate', controller.communicate.showCommunicate);

// Authentication Routes
router.post('/login', controller.auth.doLogin);
router.post('/register', controller.auth.doRegister);
router.get('/logout', controller.auth.doLogout);

export default router;