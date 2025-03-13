// JavaScript for video slideshow
let currentVideoIndex = 0;
const videoContainers = document.querySelectorAll(".ad-video-container");
const videos = document.querySelectorAll("video");

// Function to show the next video after the current one ends
function showNextVideo() {
  if (videoContainers.length === 0 || videos.length === 0) return;
  // Hide current video
  videoContainers[currentVideoIndex].classList.remove("active");

  // Move to the next video
  currentVideoIndex = (currentVideoIndex + 1) % videoContainers.length;

  // Show the next video
  videoContainers[currentVideoIndex].classList.add("active");

  // Ensure that the video starts playing when switched
  videos[currentVideoIndex].play();
}

// Attach the 'ended' event listener to each video
videos.forEach((video, index) => {
  video.addEventListener("ended", () => {
    // Show next video when the current video ends
    showNextVideo();
  });
});

// Ensure the videos are loaded and ready to play
window.addEventListener("load", () => {
  if (videos.length === 0) return;
  // Preload videos
  videos.forEach((video) => {
    video.load();
  });
});

// Start the slideshow when the page is loaded
window.onload = function () {
  // Start the first video
  videos[0].play();

  // Start the image slideshow
  startImageSlideshow();
};

// Function to start the image slideshow for ad-boxes
function startImageSlideshow() {
  const adBoxes = document.querySelectorAll(".ad-box .ad-slideshow");

  adBoxes.forEach((adBox) => {
    // Skip the video box (first box)
    if (adBox.querySelector(".ad-video-container")) return;

    const images = adBox.querySelectorAll(".ad-image-container");
    let activeIndex = 0;

    // Set the first image to active initially
    images[activeIndex].classList.add("active");

    // Change the active image every 3 seconds (3000 milliseconds)
    setInterval(() => {
      images[activeIndex].classList.remove("active"); // Hide the current image
      activeIndex = (activeIndex + 1) % images.length; // Move to the next image (circular)
      images[activeIndex].classList.add("active"); // Show the next image
    }, 3000); // 3 seconds interval
  });
}

// //Pop up javascript

// Javascript for modal open for provide quote
function openModal() {
  document.getElementById("quoteModal").classList.remove("hidden");
}

// Close the modal
function closeModal() {
  document.getElementById("quoteModal").classList.add("hidden");
}

// Close the modal when clicking outside the modal content
document.getElementById("quoteModal").addEventListener("click", function (e) {
  if (e.target === document.getElementById("quoteModal")) {
    closeModal();
  }
});

// Javascript for open modal at side bar for view more button
// Function to open the modal
function tailwindOpenModal() {
  // Show the overlay and popup
  document.getElementById("tailwind-overlay").classList.remove("hidden");
  document.getElementById("tailwind-popup").classList.remove("hidden");
}

// Function to close the modal
function tailwindCloseModal() {
  // Hide the overlay and popup
  document.getElementById("tailwind-overlay").classList.add("hidden");
  document.getElementById("tailwind-popup").classList.add("hidden");
}

// Event listener for the close button inside the popup
document
  .getElementById("tailwind-close-drawer")
  .addEventListener("click", tailwindCloseModal);

// Event listener for clicking outside the popup to close the modal
document
  .getElementById("tailwind-overlay")
  .addEventListener("click", tailwindCloseModal);

// Jobs slider on the left
// Slideshow functionality
const slidesLeft = document.querySelectorAll(".slide-left");
let currentSlideLeft = 0; // Start at the first slide

// Function to show the current slide
function showSlideLeft(index) {
  slidesLeft.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

// Initialize the slideshow
showSlideLeft(currentSlideLeft);

// Automatic slide transition every 5 seconds
setInterval(() => {
  currentSlideLeft = (currentSlideLeft + 1) % slidesLeft.length;
  showSlideLeft(currentSlideLeft);
}, 5000);

const filterInputs = document.querySelectorAll("#job-filter");
const jobCards = document.querySelectorAll(".job-card");

filterInputs.forEach((filterInput) => {
  filterInput.addEventListener("input", function () {
    const filterValue = filterInput.value.toLowerCase();

    jobCards.forEach((card) => {
      const jobTitle = card.getAttribute("data-title").toLowerCase();

      if (jobTitle.includes(filterValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// new code for jobs mobile
// popup for bar button
// Get elements
const hamburgerIconLeft = document.getElementById("hamburger-icon-left");
const closePopupBtnLeft = document.getElementById("close-popup-btn-left");
const popupLeft = document.getElementById("social-media-updates-left");

// Toggle the popup visibility when the hamburger icon is clicked
hamburgerIconLeft.addEventListener("click", () => {
  popupLeft.classList.toggle("open");
});

// Close the popup when the close button is clicked
closePopupBtnLeft.addEventListener("click", () => {
  popupLeft.classList.remove("open");
});
