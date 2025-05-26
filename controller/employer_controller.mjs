import { navLinks } from '../controller/index_controller.mjs';
const model = await import(`../model/model-bettersqlite3.mjs`);

export function showJobSeeker(req, res) {
  res.render('job_seeker', {
    title: 'Job Seeker',
    css: ['styles.css', 'job_seeker.css'],
    appName: 'Job Agency Application',
    navLinks: navLinks,
    cards: [
      {
        title: 'My Profile',
        buttons: [
          { label: 'Edit Profile', href: '/job-seeker/editProfile', id: 'editProfile' },
          { label: 'Upload Resume', href: '/job-seeker/uploadResume', id: 'uploadResume' },
          { label: 'Recommended Jobs', href: '/job-seeker/recommendedJobs', id: 'recommendedJobs' }
        ]
      },
      {
        title: 'Job Opportunities',
        buttons: [
          { label: 'Job Search', href: '/job-seeker/jobSearch', id: 'jobSearch' },
          { label: 'Saved Jobs', href: '/job-seeker/savedJobs', id: 'savedJobs' }
        ]
      }
    ]
  });
}

export function showJobSearch(req, res) {
  res.render('job_search', {
    title: 'Search Jobs',
    css: ['styles.css', 'job_search.css'],
    appName: 'Job Agency Application',
    navLinks: navLinks
  });
};

export function showEmployer(req, res) {
  res.render('employer', {
    title: 'Employer',
    css: ['styles.css', 'employer.css'],
    appName: 'Job Agency Application',
    navLinks: navLinks,
    cards: [
      {
        title: 'Job Management',
        buttons: [
          { label: 'Post New Job', href: '/employer/showPostNewJob', id: 'showPostNewJob' },
          { label: 'Post Management', href: '/employer/postManagement', id: 'postManagement' },
        ]
      },
      {
        title: 'Candidate Management',
        buttons: [
          { label: 'CV Search', href: '/employer/cv_search', id: 'cv_search' },
          { label: 'Saved Candidates', href: '/employer/savedCandidates', id: 'savedCandidates' }
        ]
      },
      {
        title: 'Interview Management',
        buttons: [
          { label: 'Interview Management', href: '/employer/interview', id: 'interview' }
        ]
      },
      {
        title: 'Company Profile',
        buttons: [
          { label: 'Edit Company Profile', href: '/employer/editCompanyProfile', id: 'editCompanyProfile' }]
      }
    ]
  });
}

export function showPostNewJob(req, res) {
  try {
    // const types = model.getJobTypes();

    res.render('post_new_job', {
      title: 'Post New Job',
      css: ['styles.css', 'post_new_job.css'],
      appName: 'Job Agency Application',
      // types,
      navLinks: navLinks
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Σφάλμα φόρτωσης φόρμας αγγελίας');
  }
}

export async function postNewJob(req, res) {
  try {
    const newJob = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary_range: req.body.salary_range,
      type_id: req.body.type_id,
      user_id: req.body.user_id
    };

    const result = await model.postNewJob(newJob);
    res.redirect('/employer/postManagement');

  } catch (err) {
    console.error(err);
    res.status(500).send('Αποτυχία καταχώρησης αγγελίας');
  }
}

export function showPostManagement(req, res, next) {
  const employerId = req.session.user.id;
  const { title, location, type_id } = req.query;

  const types = model.getJobTypes();

  const jobPosts = model.getPostsByEmployerWithFilters(employerId, { title, location, type_id });

  const jobs = model.getPostedJobs();
  res.render('post_management', {
    appName: 'Job Agency Application',
    title: 'Post Management',
    css: ['styles.css', 'post_management.css'],
    appName: 'Job Agency Application',
    jobs: jobPosts,
    types: types,
    query: { title, location, type_id },
    navLinks: navLinks
  });
}

export function showEditCompanyProfile(req, res) {
  res.render('edit_company_profile', {
    title: 'Edit Company Profile',
    css: ['styles.css', 'edit_company_profile.css'],
    appName: 'Job Agency Application',
    navLinks: navLinks
  });
}

export async function showEditJob(req, res) {
  const jobId = req.params.jobId;
  try {
    const job = model.getJobById(jobId);
    console.log('Job to edit:', job);
    const types = model.getJobTypes();

    res.render('edit_job', {
      job: job,
      types: types,
      appName: 'Job Agency Application',
      title: 'Edit Job',
      css: ['styles.css', 'post_new_job.css'],
      navLinks: navLinks
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading edit page');
  }
}

export async function editJob(req, res) {
  const jobId = req.params.jobId;
  const updatedJob = {
    job_id: jobId,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    salary_range: req.body.salary_range,
    type_id: req.body.type_id
  };

  try {
    model.updateJob(jobId, updatedJob);
    res.redirect('/employer/postManagement');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating job');
  }
}

export function deleteJob(req, res) {
  const jobId = req.params.jobId;
  try {
    model.deleteJob(jobId);
    res.redirect('/employer/postManagement');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting job');
  }
}