export function showCommunicate(req, res) {
  res.render('communicate', {
    title: 'Communicate',
    css: ['styles.css', 'communicate.css'],
    appName: 'Job Agency Application',
    contactTitle: 'Contact Us',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ],
  });
}