import { navLinks } from '../controller/index_controller.mjs';
const model = await import(`../model/model-bettersqlite3.mjs`);

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
    ],
    role: req.session.user?.role
  });
}

export function showPostNewJob(req, res) {
  try {
    const types = model.getJobTypes();

    res.render('post_new_job', {
      title: 'Post New Job',
      css: ['styles.css', 'post_new_job.css'],
      appName: 'Job Agency Application',
      jobTypes: types,
      navLinks: navLinks
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Σφάλμα φόρτωσης φόρμας αγγελίας');
  }
}

export function postNewJob(req, res) {
  try {
    const newJob = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      type_id: Number(req.body.type_id),
      work_style: req.body.work_style,
      user_id: req.session.user.id,
      company_id: req.session.user.company_id
    };

    const result = model.postNewJob(newJob);
    res.redirect('/employer/postManagement');

  } catch (err) {
    console.error(err);
    res.status(500).send('Αποτυχία καταχώρησης αγγελίας');
  }
}

export function showPostManagement(req, res, next) {
  try {
    const employerId = req.session.user.id;
    const { title, location, type_id } = req.query;

    const types = model.getJobTypes();
    const work_style = model.getWorkStyles();
    const jobPosts = model.getPostedJobs(employerId, { title, location, type_id, work_style });

    res.render('post_management', {
      appName: 'Job Agency Application',
      title: 'Post Management',
      css: ['styles.css', 'post_management.css'],
      jobs: jobPosts,
      types: types,
      work_style: work_style,
      query: { title, location, type_id },
      navLinks: navLinks
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Σφάλμα φόρτωσης αγγελιών');
  }
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
    const job = await model.getJobById(jobId);
    const types = await model.getJobTypes();

    res.render('edit_job', {
      job: job,
      jobTypes: types,
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
    type_id: Number(req.body.type_id),
    work_style: req.body.work_style,
    status: req.body.status
  };

  try {
    await model.updateJob(jobId, updatedJob);
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
