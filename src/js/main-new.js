document.addEventListener("DOMContentLoaded", function () {
  // set current year
  const year = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = year;

  // init AOS animations if available
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // add scroll animation trigger
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el);
  });
});
