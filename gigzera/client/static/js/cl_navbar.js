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
  const currentPath = window.location.pathname; // Get the current page path

  // Function to remove active class from all links
  function removeActiveClass() {
    navLinks.forEach((nav) => nav.classList.remove("active"));
  }

  // Apply active class based on current page URL
  navLinks.forEach((link) => {
    if (link.pathname === currentPath) {
      link.classList.add("active");
    }

    // Click event for dynamic class switching
    link.addEventListener("click", function () {
      removeActiveClass();
      this.classList.add("active");
    });
  });

  // Handle "Contact Us" button separately (if needed)
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      removeActiveClass();
      contactBtn.classList.add("active");
    });
  }
});
