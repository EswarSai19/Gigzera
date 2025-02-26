// pop up js code for contact us
document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.getElementById("contactBtn");
  // const contactBtn3 = document.getElementById("contactBtn3");
  const popupPanel = document.getElementById("popupPanel");
  const popupOverlay = document.getElementById("popupOverlay");
  const closeBtn = document.getElementById("closeBtn");

  // Function to open sidebar
  contactBtn.onclick = function () {
    popupOverlay.style.display = "block"; // Show overlay
    popupPanel.style.right = "0"; // Slide in sidebar
  };
  // contactBtn3.onclick = function () {
  //   popupOverlay.style.display = "block"; // Show overlay
  //   popupPanel.style.right = "0"; // Slide in sidebar
  // };
  // Function to close sidebar
  function closeSidebar() {
    popupOverlay.style.display = "none"; // Hide overlay
    popupPanel.style.right = "-400px"; // Slide out sidebar
  }

  closeBtn.onclick = closeSidebar;

  // Close sidebar when clicking outside
  popupOverlay.onclick = function (e) {
    if (e.target === popupOverlay) {
      closeSidebar();
    }
  };
});

// color Active for navbar
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav a:not(.profile-dropdown a)"); // Exclude profile dropdown links
  const allowedPaths = [
    "{% url 'cl_index' %}",
    "{% url 'cl_postajob' %}",
    "{% url 'cl_aboutus' %}",
    "{% url 'cl_industries' %}",
  ];

  // Function to remove active class from all links
  function removeActiveClass() {
    navLinks.forEach((nav) => nav.classList.remove("active"));
  }

  // Click event for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      removeActiveClass();
      if (allowedPaths.includes(this.getAttribute("href"))) {
        this.classList.add("active");
      }
    });
  });

  // Preserve active state on page reload
  const currentPath = window.location.pathname;
  navLinks.forEach((link) => {
    if (
      allowedPaths.includes(link.getAttribute("href")) &&
      link.getAttribute("href") === currentPath
    ) {
      link.classList.add("active");
    }
  });

  // Handle "Contact Us" button separately
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      removeActiveClass();
      contactBtn.classList.add("active");
    });
  }
});
