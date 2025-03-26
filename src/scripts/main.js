document.addEventListener("DOMContentLoaded", function () {
  // Initialize the side navigation with animation
  var sideNavElems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNavElems, { edge: "left", draggable: true });

  // Initialize ScrollSpy
  var scrollSpyElems = document.querySelectorAll(".scrollspy");
  M.ScrollSpy.init(scrollSpyElems);

  // Back-to-top button
  var backToTop = document.getElementById("cv-backtotop");
  if (backToTop) {
    backToTop.classList.remove("hide");
    backToTop.classList.add("cv-hide");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backToTop.classList.add("cv-show");
        backToTop.classList.remove("cv-hide");
      } else {
        backToTop.classList.add("cv-hide");
        backToTop.classList.remove("cv-show");
      }
    });
  }

  // Adjust text size for small screens
  function adjustTextSize() {
    if (window.innerWidth <= 992) {
      document.body.classList.add("flow-text");
    } else {
      document.body.classList.remove("flow-text");
    }
  }

  // Call the function on page load and resize
  adjustTextSize();
  window.addEventListener("resize", adjustTextSize);

  // Smooth scrolling for navigation links using data-target
  var navLinks = document.querySelectorAll("#cv-nav li a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var targetId = this.getAttribute("data-target");
      var targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      // Close the sidenav only if the screen width is small
      if (window.innerWidth <= 992) {
        var sidenavInstance = M.Sidenav.getInstance(
          document.querySelector(".sidenav")
        );
        if (sidenavInstance && sidenavInstance.isOpen) {
          sidenavInstance.close();
        }
      }
    });
  });
});

// Export to PDF function
function exportToPDF() {
  // Import jsPDF library
  const { jsPDF } = window.jspdf;

  // Initialize jsPDF
  const pdf = new jsPDF();

  // Select the CV content
  const cvContent = document.querySelector("#cv-card");

  // Use html2canvas to render the content as an image
  html2canvas(cvContent, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth(); // Full width of the PDF
    const pdfHeight = pdf.internal.pageSize.getHeight(); // Full height of the PDF

    // Add the image to the PDF, filling the entire page
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("resume.pdf");
  });
}
