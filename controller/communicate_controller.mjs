import { navLinks } from "./index_controller.mjs";

export function showCommunicate(req, res) {
  res.render('communicate', {
    title: 'Communicate',
    css: ['styles.css', 'communicate.css'],
    appName: 'Job Agency Application',
    contactTitle: 'Contact Us',
    navLinks: navLinks
  });
}