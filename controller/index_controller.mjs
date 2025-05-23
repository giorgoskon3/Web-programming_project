import * as employer from './employer_controller.mjs';
import * as jobSeeker from './job_seeker_controller.mjs';
import * as communicate from './communicate_controller.mjs';

export function showHome(req, res) {
  res.render('index', {
    title: 'Job Agency Application',
    appName: 'Job Agency Application',
    css: ['styles.css'],
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ]
  });
}

export default {
  showHome,
  employer,
  jobSeeker,
  communicate
};