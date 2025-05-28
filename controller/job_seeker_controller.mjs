import { navLinks } from "./index_controller.mjs";
const model = await import("../model/model-bettersqlite3.mjs");

export function showJobSeeker(req, res) {
  res.render("job_seeker", {
    title: "Job Seeker",
    css: ["styles.css", "job_seeker.css"],
    appName: "Job Agency Application",
    navLinks: navLinks,
    cards: [
      {
        title: "My Profile",
        buttons: [
          { label: "Edit Profile", href: "/job-seeker/editProfile", id: "editProfile" },
          { label: "Upload Resume", href: "/job-seeker/uploadResume", id: "uploadResume" },
          { label: "Recommended Jobs", href: "/job-seeker/recommendedJobs", id: "recommendedJobs" },
        ],
      },
      {
        title: "Job Opportunities",
        buttons: [
          { label: "Job Search", href: "/job-seeker/jobSearch", id: "jobSearch" },
          { label: "Saved Jobs", href: "/job-seeker/savedJobs", id: "savedJobs" },
        ],
      },
    ],
  });
}

export function showJobSearch(req, res) {
  const { title, location, type, level, workStyle } = req.query;

  const jobTypes = model.getJobTypes();
  const jobLevels = model.getJobLevels();
  const workStyles = model.getWorkStyles();
  const jobs = model.searchJobs({ title, location, type, level, workStyle });
  console.log(jobTypes);
  res.render("job_search", {
    title: "Job Search Platform",
    css: ["styles.css", "job_search.css"],
    appName: "Job Agency Application",
    navLinks: navLinks,
    jobTypes: jobTypes,
    jobLevels,
    workStyles,
    jobs,
  });
}

export function saveJob(req, res) {
  const { job_id } = req.body;
  const user_id = req.session.user.id;
  try {
    console.log(user_id)
    model.saveJob({user_id, job_id});
    res.redirect("/job-seeker/savedJobs");
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).send("Error saving job");
  }
}

export function showSavedJobs(req, res) {
  const userId = req.session.user.id;

  const savedJobs = model.getSavedJobs(userId);

  res.render("saved_jobs", {
    title: "Saved Jobs",
    css: ["styles.css", "saved_jobs.css"],
    appName: "Job Agency Application",
    navLinks: navLinks,
    savedJobs
  });
}

export function removeSavedJob(req, res) {
  const jobId = req.params.jobId;
  const userId = req.session.user.id;

  try {
    model.removeSavedJob({ user_id: userId, job_id: jobId });
    res.redirect("/job-seeker/savedJobs");
  } catch (err) {
    console.error("Error removing saved job:", err);
    res.status(500).send("Failed to remove job");
  }
}

export default {
  showJobSeeker,
  showJobSearch,
  showSavedJobs,
  saveJob,
  removeSavedJob,
};
