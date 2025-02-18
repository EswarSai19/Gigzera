// Sample user data
const users = [
  // Page 1
  {
    name: "Sarah Johnson",
    type: "freelancer",
    role: "Senior UI/UX Designer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Tech Solutions Inc",
    type: "client",
    role: "Software Development Company",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Michael Chen",
    type: "freelancer",
    role: "Full Stack Developer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Emma Wilson",
    type: "client",
    role: "Marketing Manager",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Sophie Martinez",
    type: "freelancer",
    role: "Product Designer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "David Kim",
    type: "client",
    role: "Software Engineer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Alex Turner",
    type: "freelancer",
    role: "Product Manager",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Isabella Garcia",
    type: "freelancer",
    role: "Content Strategist",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "James Anderson",
    type: "client",
    role: "Sales Director",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },

  // Page 2
  {
    name: "Anna Wright",
    type: "freelancer",
    role: "Graphic Designer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Global Ventures Ltd",
    type: "client",
    role: "Consulting Firm",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Ethan Moore",
    type: "freelancer",
    role: "Data Scientist",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Sophia Taylor",
    type: "client",
    role: "HR Manager",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Liam Brown",
    type: "freelancer",
    role: "Backend Developer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Olivia Martinez",
    type: "client",
    role: "Project Manager",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Lucas Smith",
    type: "freelancer",
    role: "DevOps Engineer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Mia Johnson",
    type: "freelancer",
    role: "SEO Specialist",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Benjamin Davis",
    type: "client",
    role: "Business Owner",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },

  // Page 3
  {
    name: "Charlotte Thomas",
    type: "freelancer",
    role: "Mobile App Developer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Innovation Labs",
    type: "client",
    role: "R&D Company",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Henry White",
    type: "freelancer",
    role: "Cybersecurity Specialist",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Grace Lee",
    type: "client",
    role: "Operations Manager",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Jacob Walker",
    type: "freelancer",
    role: "AI/ML Engineer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Ava Scott",
    type: "client",
    role: "E-commerce Specialist",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Matthew Evans",
    type: "freelancer",
    role: "Game Developer",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Ella King",
    type: "freelancer",
    role: "Video Editor",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
  {
    name: "Logan Harris",
    type: "client",
    role: "Tech Lead",
    avatar: "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg",
  },
];
// Function to create user cards
function createUserCard(user) {
  return `
        <div class="user-card ${user.type}">
            <div class="menu-dots">⋮</div>
            <div class="user-info">
                <img src="${user.avatar}" alt="${
    user.name
  }" class="user-avatar">
                <div class="user-details">
                    <h3>${user.name}</h3>
                    <span class="user-type ${user.type}">${
    user.type.charAt(0).toUpperCase() + user.type.slice(1)
  }</span>
                </div>
            </div>
            <div class="user-role">${user.role}</div>
            <a href="#" class="view-profile-btn" data-type="${
              user.type
            }" data-name="${user.name}">View Profile</a>
        </div>
    `;
}

// Function to render users
function renderUsers() {
  const usersGrid = document.getElementById("usersGrid");
  if (usersGrid) {
    usersGrid.innerHTML = users.map((user) => createUserCard(user)).join("");
  } else {
    console.error("Users grid element not found");
  }
}

// Pagination functionality
let currentPage = 1;
const usersPerPage = 9;
const totalPages = Math.ceil(users.length / usersPerPage);

// Get users for current page
function getUsersForPage(page) {
  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;
  return users.slice(start, end);
}

// Update page content
function updatePage(page) {
  const pageUsers = getUsersForPage(page);
  const usersGrid = document.getElementById("usersGrid");
  usersGrid.innerHTML = pageUsers.map((user) => createUserCard(user)).join("");

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent == page) {
      btn.classList.add("active");
    }
  });

  addViewProfileEventListeners();
}

// Add event listeners for the "View Profile" button
function addViewProfileEventListeners() {
  document.querySelectorAll(".view-profile-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const userType = button.getAttribute("data-type");
      const userName = button.getAttribute("data-name");

      if (userType === "freelancer") {
        window.location.href = `../html/Design CR Admin Freelancer view.html`;
      } else if (userType === "client") {
        window.location.href = `../html/Design CR Admin recruiter view.html`;
      }
    });
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  updatePage(1);

  document.querySelectorAll(".page-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const page = parseInt(e.target.textContent);
      currentPage = page;
      updatePage(page);
    });
  });

  document.querySelector(".prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage(currentPage);
    }
  });

  document.querySelector(".next-btn").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage(currentPage);
    }
  });

  addViewProfileEventListeners();
});

// Error handling for images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName.toLowerCase() === "img") {
      e.target.src =
        "https://cdn.yellowmessenger.com/Xmnn1dek6nzZ1735637434099.jpeg";
    }
  },
  true
);
