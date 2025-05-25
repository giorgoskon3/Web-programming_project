import { navLinks } from "./index_controller.mjs";
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
}

export function showSavedJobs(req, res) {
  res.render('saved_jobs', {
    title: 'Saved Jobs',
    css: ['styles.css', 'saved_jobs.css'],
    appName: 'Job Agency Application',
    navLinks: navLinks
  });
}