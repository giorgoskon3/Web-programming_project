document.addEventListener("DOMContentLoaded", () => {
  const jobList = document.getElementById("jobList");
  const filterForm = document.getElementById("filterForm");

  const jobs = [
    {
      jobTitle: "Software Engineer",
      location: "Athens",
      type: "Full-time",
      level: "Mid",
      workStyle: "Remote",
      description: "Develop and maintain web applications.",
      company: "CodeHub"
    },
    {
      jobTitle: "UI/UX Designer",
      location: "Thessaloniki",
      type: "Part-time",
      level: "Entry",
      workStyle: "On-site",
      description: "Design engaging interfaces for our mobile app.",
      company: "CreativeMinds"
    },
    {
      jobTitle: "Data Analyst",
      location: "Patras",
      type: "Internship",
      level: "Entry",
      workStyle: "Hybrid",
      description: "Analyze data and generate reports.",
      company: "DataForge"
    },
    {
      jobTitle: "Project Manager",
      location: "Remote",
      type: "Full-time",
      level: "Senior",
      workStyle: "Remote",
      description: "Lead and coordinate development teams.",
      company: "InnoWorks"
    }
  ];

  function displayJobs(jobsToShow) {
    jobList.innerHTML = "";
    if (jobsToShow.length === 0) {
      jobList.innerHTML = "<p>No jobs found matching your criteria.</p>";
      return;
    }

    jobsToShow.forEach(job => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <h3>${job.jobTitle}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Type:</strong> ${job.type}</p>
        <p><strong>Level:</strong> ${job.level}</p>
        <p><strong>Work Style:</strong> ${job.workStyle}</p>
        <p>${job.description}</p>
      `;
      jobList.appendChild(card);
    });
  }

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const jobTitle = document.getElementById("jobTitle").value.toLowerCase();
    const location = document.getElementById("location").value.toLowerCase();
    const type = document.getElementById("type").value;
    const level = document.getElementById("level").value;
    const workStyle = document.getElementById("workStyle").value;

    const filtered = jobs.filter(job => {
      return (
        (jobTitle === "" || job.jobTitle.toLowerCase().includes(jobTitle)) &&
        (location === "" || job.location.toLowerCase().includes(location)) &&
        (type === "" || job.type === type) &&
        (level === "" || job.level === level) &&
        (workStyle === "" || job.workStyle === workStyle)
      );
    });

    displayJobs(filtered);
  });

  // Display all jobs on initial load
  displayJobs(jobs);
});
