// model/model-bettersqlite3.mjs

import { default as bettersqlite3 } from 'better-sqlite3';
import { get } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

// Για να υπολογίσουμε __dirname σε ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Using better-sqlite3 module');

// Δημιουργία σύνδεσης με SQLite βάση δεδομένων
const db = new bettersqlite3(path.join(__dirname, '../data/sqlite-database.db'), { fileMustExist: true });

// Συνάρτηση: επιστροφή όλων των καταχωρήσεων στον πίνακα JOB
const getPostedJobs = () => {
   try {
      const stmt = db.prepare('SELECT * FROM JOB');
      return stmt.all();
   } catch (err) {
      throw err;
   }
};

const postNewJob = (newJob) => {
   try {
      const addNewJobStm = db.prepare('INSERT INTO JOB (title, description, location, type_id, user_id, status)  VALUES (?, ?, ?, ?, ?, ?)');
      const result = addNewJobStm.run(newJob.title, newJob.description, newJob.location, newJob.type_id, newJob.user_id, 'open');
      console.log('Εισάγεται η νέα δουλειά:', addNewJobStm);
      return result;
   } catch (err) {
      throw err;
   }
};

const getUserByUsername = (username) => {
   try {
      const stmt = db.prepare('SELECT * FROM USER WHERE username = ?');
      return stmt.get(username);
   } catch (err) {
      throw err;
   }
}

const createUser = (user) => {
   try {
      const addNewUserStm = db.prepare('INSERT INTO USER (firstName, lastName, username, email, password, location, phone) VALUES (?, ?, ?, ?, ?, ?, ?)');
      const result = addNewUserStm.run(user.firstName, user.lastName, user.username, user.email, user.password, user.location, user.phone);
      console.log('Εισάγεται ο νέος χρήστης:', addNewUserStm);
      return result;
   } catch (err) {
      throw err;
   }
};

function getPostsByEmployerWithFilters(employerId, filters) {
   let sql = 'SELECT * FROM JOB WHERE user_id = ?';
   const params = [employerId];

   if (filters.title) {
      sql += ' AND title LIKE ?';
      params.push(`%${filters.title}%`);
   }

   if (filters.location) {
      sql += ' AND location LIKE ?';
      params.push(`%${filters.location}%`);
   }

   if (filters.type_id) {
      sql += ' AND type_id = ?';
      params.push(filters.type_id);
   }

   const stmt = db.prepare(sql);
   return stmt.all(...params);
}

function getJobTypes() {
   const stmt = db.prepare('SELECT * FROM TYPE');
   return stmt.all();
}

function getJobById(id) {
   const stmt = db.prepare('SELECT * FROM JOB WHERE job_id = ?');
   return stmt.get(id);
}

const updateJob = (jobId, updatedJob) => {
   try {
      const updateJobStm = db.prepare('UPDATE JOB SET title = ?, description = ?, location = ?, salary_range = ?, type_id = ? WHERE job_id = ?');
      const result = updateJobStm.run(updatedJob.title, updatedJob.description, updatedJob.location, updatedJob.salary_range, updatedJob.type_id, jobId);
      console.log('Ενημερώνεται η δουλειά:', updateJobStm);
      return result;
   } catch (err) {
      throw err;
   }
};

const deleteJob = (jobId) => {
   try {
      const deleteJobStm = db.prepare('DELETE FROM JOB WHERE job_id = ?');
      const result = deleteJobStm.run(jobId);
      console.log('Διαγράφεται η δουλειά:', deleteJobStm);
      return result;
   } catch (err) {
      throw err;
   }
}

function getCompanyByName(name) {
   const stmt = db.prepare('SELECT * FROM COMPANY WHERE company_name = ?');
   return stmt.get(name);
}

function createCompany({ name, location, description }) {
   const stmt = db.prepare('INSERT INTO COMPANY (company_name, location, description) VALUES (?, ?, ?)');
   return stmt.run(name, location, description);
}

function createEmployer({ user_id, company_id }) {
   const stmt = db.prepare('INSERT INTO EMPLOYER (company_id, user_id) VALUES (?, ?)');
   return stmt.run(company_id, user_id);
}

function createJobSeeker({ user_id, cv }) {
   const stmt = db.prepare('INSERT INTO JOB_SEEKER (user_id, CV) VALUES (?, ?)');
   return stmt.run(user_id, cv);
}

function getUserRole(user_id) {
  const jobSeeker = db.prepare("SELECT * FROM JOB_SEEKER WHERE user_id = ?").get(user_id);
  if (jobSeeker) return 'job_seeker';

  const employer = db.prepare("SELECT * FROM EMPLOYER WHERE user_id = ?").get(user_id);
  if (employer) return 'employer';

  return null;
}

export function getJobLevels() {
  return db.prepare("SELECT DISTINCT level FROM TYPE").all().map(r => r.level);
}

export function getWorkStyles() {
  return db.prepare("SELECT DISTINCT work_style FROM JOB").all().map(r => r.work_style);
}

export function searchJobs({ title, location, type, level, workStyle }) {
  let query = `
    SELECT JOB.job_id, JOB.title, JOB.location, TYPE.type_name, TYPE.level, JOB.work_style
    FROM JOB
    LEFT JOIN TYPE ON JOB.type_id = TYPE.type_id
    WHERE 1=1
  `;
  const params = [];

  if (title) {
    query += " AND JOB.title LIKE ?";
    params.push(`%${title}%`);
  }
  if (location) {
    query += " AND JOB.location LIKE ?";
    params.push(`%${location}%`);
  }
  if (type) {
    query += " AND TYPE.type_name = ?";
    params.push(type);
  }
  if (level) {
    query += " AND TYPE.level = ?";
    params.push(level);
  }
  if (workStyle) {
    query += " AND JOB.work_style = ?";
    params.push(workStyle);
  }

  return db.prepare(query).all(...params);
}

export function saveJob({ user_id, job_id }) {
  return db.prepare(
    `INSERT OR IGNORE INTO saves (user_id, job_id, requestDate, status)
     VALUES (?, ?, strftime('%s','now'), 'saved')`
  ).run(user_id, job_id);
}

export function getSavedJobs(user_id) {
  return db.prepare(`
    SELECT JOB.job_id, JOB.title, JOB.location, TYPE.type_name, TYPE.level, JOB.work_style
    FROM saves
    JOIN JOB ON saves.job_id = JOB.job_id
    LEFT JOIN TYPE ON JOB.type_id = TYPE.type_id
    WHERE saves.user_id = ?
  `).all(user_id);
}

export function removeSavedJob({ user_id, job_id }) {
  return db.prepare("DELETE FROM saves WHERE user_id = ? AND job_id = ?").run(user_id, job_id);
}


// Συνάρτηση: κλείσιμο της βάσης
function shutdown() {
   try {
      db.close();
      console.log('Έκλεισε η σύνδεση με την SQLite.');
   } catch (err) {
      throw err;
   }
}

export { getPostedJobs, postNewJob, getUserByUsername, createUser, getPostsByEmployerWithFilters,
   getJobTypes, getJobById, updateJob, deleteJob, getCompanyByName, createCompany, createEmployer,
   createJobSeeker, getUserRole, shutdown };
