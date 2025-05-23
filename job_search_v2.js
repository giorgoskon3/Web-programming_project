// job_search.js

const jobs = [
  {
    title: "Software Engineer",
    location: "Athens",
    type: "Full-time",
    level: "Mid",
    workStyle: "Hybrid",
    benefits: "Health Insurance",
    salary: 1800,
    skills: ["Java", "SQL", "Spring"]
  },
  {
    title: "Frontend Developer",
    location: "Thessaloniki",
    type: "Part-time",
    level: "Entry",
    workStyle: "Remote",
    benefits: "Flexible Hours",
    salary: 1600,
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Project Manager",
    location: "Athens",
    type: "Full-time",
    level: "Senior",
    workStyle: "On-site",
    benefits: "Paid Time Off",
    salary: 2500,
    skills: ["Leadership", "Scrum", "Agile"]
  }
];

document.getElementById("filterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  filterJobs();
});

function filterJobs() {
  const title = document.getElementById("title").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const type = document.getElementById("type").value;
  const level = document.getElementById("level").value;
  const workStyle = document.getElementById("workStyle").value;
  const benefits = document.getElementById("benefits").value;
  const salaryInput = document.getElementById("salary").value;
  const skillsInput = document.getElementById("skills").value.toLowerCase();

  const salary = salaryInput ? parseFloat(salaryInput) : 0;
  const skillsArray = skillsInput
    ? skillsInput.split(",").map(skill => skill.trim().toLowerCase())
    : [];

  const filtered = jobs.filter((job) => {
    const jobSkills = job.skills.map(skill => skill.toLowerCase());

    const matchesSkills = skillsArray.every(skill =>
      jobSkills.includes(skill)
    );

    return (
      (title === "" || job.title.toLowerCase().includes(title)) &&
      (location === "" || job.location.toLowerCase().includes(location)) &&
      (type === "" || job.type === type) &&
      (level === "" || job.level === level) &&
      (workStyle === "" || job.workStyle === workStyle) &&
      (benefits === "" || job.benefits === benefits) &&
      (salary === 0 || job.salary >= salary) &&
      (skillsArray.length === 0 || matchesSkills)
    );
  });

  displayJobs(filtered);
}

function displayJobs(jobsToDisplay) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (jobsToDisplay.length === 0) {
    jobList.innerHTML = "<p>No jobs found matching the criteria.</p>";
    return;
  }

  jobsToDisplay.forEach((job) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <div class="meta"><strong>Location:</strong> ${job.location}</div>
      <div class="meta"><strong>Type:</strong> ${job.type}</div>
      <div class="meta"><strong>Level:</strong> ${job.level}</div>
      <div class="meta"><strong>Work Style:</strong> ${job.workStyle}</div>
      <div class="meta"><strong>Benefits:</strong> ${job.benefits}</div>
      <div class="meta"><strong>Salary:</strong> €${job.salary}</div>
      <div class="meta"><strong>Skills:</strong> ${job.skills.join(", ")}</div>
    `;
    jobList.appendChild(card);
  });
}

// Αρχική εμφάνιση όλων των jobs
displayJobs(jobs);