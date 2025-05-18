const model = await import(`../model/model-bettersqlite3.mjs`);

export function showJobSeeker(req, res) {
  res.render('job_seeker', {
    title: 'Job Seeker',
    css: ['styles.css', 'job_seeker.css'],
    appName: 'Job Agency Application',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ],
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
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ]
  });
}

export function showSavedJobs(req, res) {
  res.render('saved_jobs', {
    title: 'Saved Jobs',
    css: ['styles.css', 'saved_jobs.css'],
    appName: 'Job Agency Application',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ]
  });
}

export function showEmployer(req, res) {
  res.render('employer', {
    title: 'Employer',
    css: ['styles.css', 'employer.css'],
    appName: 'Job Agency Application',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ],
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
      navLinks: [
        { href: '/', text: 'Home' },
        { href: '/job-seeker', text: 'Job Seeker' },
        { href: '/employer', text: 'Employer' },
        { href: '/communicate', text: 'Communicate' }
      ]
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
  const jobs = model.getPostedJobs();
  res.render('post_management', {
    title: 'Post Management',
    css: ['styles.css', 'post_management.css'],
    appName: 'Job Agency Application',
    jobs: jobs,
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ]
  });
}

export function showEditCompanyProfile(req, res) {
  res.render('edit_company_profile', {
    title: 'Edit Company Profile',
    css: ['styles.css', 'edit_company_profile.css'],
    appName: 'Job Agency Application',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ]
  });
}