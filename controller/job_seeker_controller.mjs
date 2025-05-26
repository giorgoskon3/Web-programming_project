import { default as db } from '../model/model-bettersqlite3.mjs';

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
  const { title, location, type, level, workStyle } = req.query;

  const jobTypes = db.prepare('SELECT DISTINCT type_name FROM TYPE').all().map(r => r.type_name);
  const jobLevels = db.prepare('SELECT DISTINCT level FROM TYPE').all().map(r => r.level);
  const workStyles = db.prepare('SELECT DISTINCT work_style FROM JOB').all().map(r => r.work_style);

  let query = `
    SELECT JOB.job_id, JOB.title, JOB.location, TYPE.type_name, TYPE.level, JOB.work_style
    FROM JOB
    LEFT JOIN TYPE ON JOB.type_id = TYPE.type_id
    WHERE 1=1
  `;
  const params = [];
  if (title) {
    query += ' AND JOB.title LIKE ?';
    params.push(`%${title}%`);
  }
  if (location) {
    query += ' AND JOB.location LIKE ?';
    params.push(`%${location}%`);
  }
  if (type) {
    query += ' AND TYPE.type_name = ?';
    params.push(type);
  }
  if (level) {
    query += ' AND TYPE.level = ?';
    params.push(level);
  }
  if (workStyle) {
    query += ' AND JOB.work_style = ?';
    params.push(workStyle);
  }

  const jobs = db.prepare(query).all(...params);

  res.render('job_search', {
    title: 'Job Search Platform',
    css: ['styles.css', 'job_search_v2.css'],
    appName: 'Job Agency Application',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ],
    jobTypes,
    jobLevels,
    workStyles,
    jobs
  });
}

export function saveJob(req, res) {
  const { user_id, job_id } = req.body;

  try {
    const stmt = db.prepare(`INSERT OR IGNORE INTO saves (user_id, job_id, requestDate, status) VALUES (?, ?, strftime('%s','now'), 'saved')`);
    stmt.run(user_id, job_id);
    res.redirect('/job-seeker/jobSearch');
  } catch (err) {
    console.error('Error saving job:', err);
    res.status(500).send('Error saving job');
  }
}

export function showSavedJobs(req, res) {
  const userId = 1;

  const savedJobs = db.prepare(`
    SELECT JOB.job_id, JOB.title, JOB.location, TYPE.type_name, TYPE.level, JOB.work_style
    FROM saves
    JOIN JOB ON saves.job_id = JOB.job_id
    LEFT JOIN TYPE ON JOB.type_id = TYPE.type_id
    WHERE saves.user_id = ?
  `).all(userId);

  res.render('saved_jobs', {
    title: 'Saved Jobs',
    css: ['styles.css', 'saved_jobs.css'],
    appName: 'Job Agency Application',
    navLinks: [
      { href: '/', text: 'Home' },
      { href: '/job-seeker', text: 'Job Seeker' },
      { href: '/employer', text: 'Employer' },
      { href: '/communicate', text: 'Communicate' }
    ],
    savedJobs
  });
}

export function removeSavedJob(req, res) {
  const jobId = req.params.jobId;
  const userId = 1;

  try {
    const stmt = db.prepare('DELETE FROM saves WHERE user_id = ? AND job_id = ?');
    stmt.run(userId, jobId);
    res.redirect('/job-seeker/savedJobs');
  } catch (err) {
    console.error('Error removing saved job:', err);
    res.status(500).send('Failed to remove job');
  }
}




export default {
  showJobSeeker,
  showJobSearch,
  showSavedJobs,
  saveJob,
  removeSavedJob
};
