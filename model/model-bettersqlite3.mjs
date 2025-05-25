// model/model-bettersqlite3.mjs

import { default as bettersqlite3 } from 'better-sqlite3';
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
      const addNewJobStm = db.prepare('INSERT INTO JOB (title, description, location, salary_range, type_id, user_id, status)  VALUES (?, ?, ?, ?, ?, ?, ?)');
      const result = addNewJobStm.run(newJob.title, newJob.description, newJob.location, newJob.salary_range, newJob.type_id, newJob.user_id, 'open');
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
      const addNewUserStm = db.prepare('INSERT INTO USER (firstName, lastName, username, email, password, location, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
      const result = addNewUserStm.run(user.firstName, user.lastName, user.username, user.email, user.password, user.location, user.phone, user.role);
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
  const stmt = db.prepare('SELECT * FROM COMPANY WHERE name = ?');
  return stmt.get(name);
}

function createCompany({ name, location }) {
  const stmt = db.prepare('INSERT INTO COMPANY (name, location) VALUES (?, ?)');
  return stmt.run(name, location); // επιστρέφει { lastInsertRowid: ... }
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

export { getPostedJobs, postNewJob, getUserByUsername, createUser, getPostsByEmployerWithFilters, getJobTypes, getJobById, updateJob, deleteJob, getCompanyByName, createCompany, shutdown };
