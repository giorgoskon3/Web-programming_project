// saved_jobs.js

document.addEventListener("DOMContentLoaded", () => {
  const jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach(card => {
    const applyBtn = card.querySelector(".apply-btn");
    const removeBtn = card.querySelector(".remove-btn");

    applyBtn.addEventListener("click", () => {
      alert("You applied to this job!");
      // Αν θες redirect: window.location.href = "application_form.html";
    });

    removeBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to remove this saved job?")) {
        card.remove();
      }
    });
  });
});