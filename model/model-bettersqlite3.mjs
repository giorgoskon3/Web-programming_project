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

// Συνάρτηση: κλείσιμο της βάσης
function shutdown() {
   try {
      db.close();
      console.log('Έκλεισε η σύνδεση με την SQLite.');
   } catch (err) {
      throw err;
   }
}

export { getPostedJobs, postNewJob, shutdown };
