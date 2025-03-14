// Separate data for recruiters, active users, and banned users
// const totalRecruiters = [
//   {
//     id: "ACT-141",
//     name: "Aarav Singh",
//     company: "Innovative Concepts",
//     phone: "+91 98877 54301",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-142",
//     name: "Aditi Mehta",
//     company: "NextGen Consulting",
//     phone: "+91 87766 43220",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-143",
//     name: "Rohit Yadav",
//     company: "Digital Solutions",
//     phone: "+91 76655 32115",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-144",
//     name: "Priya Sharma",
//     company: "TechConnect",
//     phone: "+91 65544 21025",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-145",
//     name: "Nikhil Bansal",
//     company: "Future Innovations",
//     phone: "+91 54433 10935",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-146",
//     name: "Deepika Agarwal",
//     company: "Tech Synergy",
//     phone: "+91 43322 98761",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-147",
//     name: "Ravi Singh",
//     company: "Innovators Hub",
//     phone: "+91 32211 87678",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-148",
//     name: "Shweta Gupta",
//     company: "Innovative Horizons",
//     phone: "+91 21110 76545",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-149",
//     name: "Sakshi Kapoor",
//     company: "Creative Tech",
//     phone: "+91 10099 65472",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-150",
//     name: "Neha Patel",
//     company: "Strategic Solutions",
//     phone: "+91 99877 54329",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-151",
//     name: "Kunal Joshi",
//     company: "Digital Minds",
//     phone: "+91 88766 43213",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-152",
//     name: "Nikita Agarwal",
//     company: "Business Connect",
//     phone: "+91 77655 32130",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-153",
//     name: "Manish Rathi",
//     company: "Tech Innovators",
//     phone: "+91 66544 21033",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-154",
//     name: "Harshita Sharma",
//     company: "Tech Insights",
//     phone: "+91 55433 10967",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-155",
//     name: "Nitin Mehta",
//     company: "SmartTech Solutions",
//     phone: "+91 44322 09878",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-156",
//     name: "Vaibhav Gupta",
//     company: "NextEra Solutions",
//     phone: "+91 33211 98734",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-157",
//     name: "Suman Verma",
//     company: "Creative Horizons",
//     phone: "+91 22110 87654",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-158",
//     name: "Ravi Joshi",
//     company: "Visionary Solutions",
//     phone: "+91 11099 76543",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-159",
//     name: "Alok Agarwal",
//     company: "Tech Solutions",
//     phone: "+91 99888 65434",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-160",
//     name: "Ananya Rathi",
//     company: "StartUp Innovations",
//     phone: "+91 88777 54316",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
// ];

// const activeUsers = [
//   {
//     id: "ACT-161",
//     name: "Aman Singh",
//     company: "Tech Ventures",
//     phone: "+91 98888 54327",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-162",
//     name: "Rohit Joshi",
//     company: "Innovative Solutions",
//     phone: "+91 87777 43228",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-163",
//     name: "Neha Sharma",
//     company: "Strategic Vision",
//     phone: "+91 76666 32140",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-164",
//     name: "Sandeep Rathi",
//     company: "Creative Minds",
//     phone: "+91 65555 21050",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-165",
//     name: "Rashi Mehta",
//     company: "Future Innovations",
//     phone: "+91 54444 10958",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-166",
//     name: "Amit Gupta",
//     company: "NextEra Technologies",
//     phone: "+91 43333 98784",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-167",
//     name: "Simran Bansal",
//     company: "Visionary Enterprises",
//     phone: "+91 32222 87691",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-168",
//     name: "Siddharth Mehta",
//     company: "Dynamic Tech",
//     phone: "+91 21111 76589",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-169",
//     name: "Shubhi Patel",
//     company: "Tech Entrepreneurs",
//     phone: "+91 10088 65466",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-170",
//     name: "Arvind Kumar",
//     company: "Business Innovations",
//     phone: "+91 99888 54343",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-171",
//     name: "Sonal Sharma",
//     company: "Tech Minds",
//     phone: "+91 88777 43205",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-172",
//     name: "Varun Joshi",
//     company: "Innovative Horizons",
//     phone: "+91 77666 32158",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-173",
//     name: "Gaurav Bansal",
//     company: "StartUp Solutions",
//     phone: "+91 66555 21063",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-174",
//     name: "Pooja Kapoor",
//     company: "Tech Connect",
//     phone: "+91 55444 10972",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-175",
//     name: "Kritika Sharma",
//     company: "Innovate Group",
//     phone: "+91 44333 09886",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-176",
//     name: "Rajeev Agarwal",
//     company: "Creative Hub",
//     phone: "+91 33222 98755",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-177",
//     name: "Vishal Rathi",
//     company: "Tech Vision",
//     phone: "+91 22111 87648",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-178",
//     name: "Tanuja Mehta",
//     company: "Global Insights",
//     phone: "+91 11088 76559",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-179",
//     name: "Aarti Joshi",
//     company: "Future Tech",
//     phone: "+91 99877 65446",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-180",
//     name: "Anurag Kapoor",
//     company: "Elite Tech",
//     phone: "+91 88777 54302",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
// ];

// const bannedUsers = [
//   {
//     id: "ACT-181",
//     name: "Ananya Mehta",
//     company: "Tech Connect",
//     phone: "+91 98877 54310",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-182",
//     name: "Avi Gupta",
//     company: "Visionary Innovations",
//     phone: "+91 87766 43211",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-183",
//     name: "Rohit Patel",
//     company: "Innovative Solutions",
//     phone: "+91 76655 32118",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-184",
//     name: "Nikita Rathi",
//     company: "Global Enterprises",
//     phone: "+91 65544 21041",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-185",
//     name: "Siddhant Kapoor",
//     company: "Creative Solutions",
//     phone: "+91 54433 10940",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-186",
//     name: "Ravina Joshi",
//     company: "Tech Group",
//     phone: "+91 43322 98768",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-187",
//     name: "Sonal Patel",
//     company: "Visionary Ideas",
//     phone: "+91 32211 87662",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-188",
//     name: "Karan Bansal",
//     company: "Business Experts",
//     phone: "+91 21110 76560",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-189",
//     name: "Anushka Mehta",
//     company: "Tech Innovators",
//     phone: "+91 10099 65455",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-190",
//     name: "Ajay Sharma",
//     company: "NextGen Consulting",
//     phone: "+91 99877 54332",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-191",
//     name: "Nirav Joshi",
//     company: "Tech Experts",
//     phone: "+91 88766 43207",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-192",
//     name: "Tanvi Kapoor",
//     company: "Global Ventures",
//     phone: "+91 77655 32150",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-193",
//     name: "Shubham Yadav",
//     company: "Tech Enterprises",
//     phone: "+91 66544 21062",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-194",
//     name: "Vaishali Sharma",
//     company: "Smart Solutions",
//     phone: "+91 55433 10982",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-195",
//     name: "Rishabh Gupta",
//     company: "Digital Ventures",
//     phone: "+91 44322 09879",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-196",
//     name: "Shalini Rathi",
//     company: "Creative Minds",
//     phone: "+91 33211 98748",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-197",
//     name: "Neeraj Mehta",
//     company: "Business Innovations",
//     phone: "+91 22110 87629",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-198",
//     name: "Tanu Mehta",
//     company: "Strategic Ventures",
//     phone: "+91 11099 76514",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-199",
//     name: "Vanshika Sharma",
//     company: "NextEra Group",
//     phone: "+91 99887 65426",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
//   {
//     id: "ACT-200",
//     name: "Pranav Yadav",
//     company: "Innovative Minds",
//     phone: "+91 88776 54333",
//     img: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
//   },
// ];

let currentCategory = totalRecruiters; // Default to totalRecruiters
let currentPage = 1;
const itemsPerPage = 10;

function renderProfiles(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const profilesToShow = currentCategory.slice(start, end);

  const profilesGrid = document.getElementById("profilesGrid");
  // profilesGrid.innerHTML = "";

  // profilesToShow.forEach((recruiter) => {
  //   const profileCard = `
  //           <div class="profile-card">
  //               <button class="more-options">
  //                   <i class="fas fa-ellipsis-v"></i>
  //               </button>
  //               <img src="${recruiter.img}" alt="${recruiter.name}">
  //               <h3>${recruiter.name}</h3>
  //               <div class="id">ID: ${recruiter.id}</div>
  //               <div class="company">${recruiter.company}</div>
  //               <div class="phone">${recruiter.phone}</div>
  //               <button class="view-profile" onclick="window.location.href='../html/Design CR Admin recruiter view.html'">View Profile</button>
  //           </div>
  //       `;
  //   profilesGrid.innerHTML += profileCard;
  // });
}

function renderPagination() {
  const totalPages = Math.ceil(currentCategory.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Add prev arrow
  const prevArrow = document.createElement("button");
  prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevArrow.disabled = currentPage === 1;
  prevArrow.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProfiles(currentPage);
      renderPagination();
    }
  });
  pagination.appendChild(prevArrow);

  // Add page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderProfiles(currentPage);
      renderPagination();
    });
    pagination.appendChild(pageButton);
  }

  // Add next arrow
  const nextArrow = document.createElement("button");
  nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextArrow.disabled = currentPage === totalPages;
  nextArrow.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProfiles(currentPage);
      renderPagination();
    }
  });
  pagination.appendChild(nextArrow);
}

// Toggle between sections: Total Recruiters, Active Users, and Banned Users
function highlightSection(sectionId) {
  // Clear previous highlights
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.classList.remove("highlighted-section");
  });

  document.body.classList.remove(
    "highlight-total",
    "highlight-active",
    "highlight-banned"
  );

  // Set the current category
  if (sectionId === "totalRecruiters") {
    currentCategory = totalRecruiters;
    document.body.classList.add("highlight-total");
  } else if (sectionId === "activeUsers") {
    currentCategory = activeUsers;
    document.body.classList.add("highlight-active");
  } else if (sectionId === "bannedUsers") {
    currentCategory = bannedUsers;
    document.body.classList.add("highlight-banned");
  }

  // Highlight the selected section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.add("highlighted-section");

  // Reset pagination and profiles
  currentPage = 1;
  renderProfiles(currentPage);
  renderPagination();
}

// Initial render
renderProfiles(currentPage);
renderPagination();

// New js for filters:
function filterProfiles() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let profiles = document.querySelectorAll(".profile-card");

  profiles.forEach((profile) => {
    let name = profile.querySelector(".name").innerText.toLowerCase();
    let userId = profile.querySelector(".id").innerText.toLowerCase();
    let company = profile.querySelector(".company").innerText.toLowerCase();

    if (
      name.includes(input) ||
      userId.includes(input) ||
      company.includes(input)
    ) {
      profile.style.display = "block"; // Show matching profiles
    } else {
      profile.style.display = "none"; // Hide non-matching profiles
    }
  });
}

function sortProfiles() {
  let sortOption = document.getElementById("sortOption").value;
  let profilesGrid = document.getElementById("profilesGrid");
  let profiles = Array.from(
    profilesGrid.getElementsByClassName("profile-card")
  );

  profiles.sort((a, b) => {
    let aValue, bValue;

    if (sortOption === "name") {
      aValue = a.querySelector(".name").innerText.toLowerCase();
      bValue = b.querySelector(".name").innerText.toLowerCase();
    } else if (sortOption === "id") {
      aValue = a.querySelector(".id").innerText.replace("ID: ", "").trim();
      bValue = b.querySelector(".id").innerText.replace("ID: ", "").trim();
    } else if (sortOption === "company") {
      aValue = a.querySelector(".company").innerText.toLowerCase();
      bValue = b.querySelector(".company").innerText.toLowerCase();
    }

    return aValue.localeCompare(bValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  profilesGrid.innerHTML = ""; // Clear the container
  profiles.forEach((profile) => profilesGrid.appendChild(profile)); // Append sorted profiles
}
