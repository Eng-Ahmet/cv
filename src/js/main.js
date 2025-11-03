document.addEventListener("DOMContentLoaded", function () {
  // set year
  const y = new Date().getFullYear();
  const el = document.getElementById("year");
  if (el) el.textContent = y;

  // init AOS animations if available
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        const t = document.querySelector(href);
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
