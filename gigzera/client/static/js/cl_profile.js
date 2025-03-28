//
function toggleEditForm() {
  const form = document.getElementById("edit-form");

  // Check for both 'none' and default (empty) state
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function saveChanges() {
  const name = document.getElementById("edit-name").value;
  const title = document.getElementById("edit-title").value;
  const email = document.getElementById("edit-email").value;
  const phone = document.getElementById("edit-phone").value;
  const linkedin = document.getElementById("edit-linkedin").value;
  const company = document.getElementById("edit-company").value;

  const profileImageInput = document.getElementById("edit-image");
  const profileImage = document.getElementById("profile-image");

  if (profileImageInput.files && profileImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(profileImageInput.files[0]);
  }

  document.getElementById("profile-name").textContent = name;
  document.getElementById("profile-title").textContent = title;
  document.getElementById("profile-email").textContent = email;
  document.getElementById("profile-phone").textContent = phone;
  document.getElementById("profile-linkedin").href = linkedin;
  document.getElementById("profile-linkedin").textContent = linkedin;
  document.getElementById("profile-company").textContent = company;

  toggleEditForm();
}

// Update Profile Image
function updateProfileImage(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const displayImg = document.getElementById("display-img");
    displayImg.src = reader.result;
  };

  if (input.files && input.files[0]) {
    reader.readAsDataURL(input.files[0]);
  }
}

function toggleProfileMenu() {
  const menu = document.getElementById("profile-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Update profile from localStorage (sync with profile.html)
// function updateProfileHeader() {
//   const initials = localStorage.getItem("profileInitials") || "Guest";
//   const name = localStorage.getItem("profileName") || "Guest";
//   const email = localStorage.getItem("profileEmail") || "guest@example.com";

//   document.getElementById("profile-initials").textContent = initials;
//   document.getElementById("profile-name-dropdown").textContent = name;
//   document.getElementById("profile-email-dropdown").textContent = email;
// }

// // Call on page load
// document.addEventListener("DOMContentLoaded", updateProfileHeader);

// New part of the file
const skillsInput = document.getElementById("skills-required");
const suggestionsList = document.getElementById("suggestions-list");
const selectedSkillsContainer = document.getElementById("selected-skills");
const hiddenSkillsInput = document.getElementById("skills-list"); // Hidden input
const availableSkills = [
  "Java",
  "JavaScript",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "Kotlin",
  "Swift",
  "HTML5",
  "CSS3",
  "React.js",
  "Angular",
  "Vue.js",
  "SASS",
  "Bootstrap",
  "Node.js",
  "Django",
  "Flask",
  "Spring Boot",
  ".NET",
  "Express.js",
  "SQL",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Oracle",
  "Redis",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Ansible",
  "Terraform",
  "AWS",
  "Azure",
  "Google Cloud Platform (GCP)",
  "RESTful APIs",
  "GraphQL",
  "SOAP",
  "Jest",
  "Mocha",
  "Jasmine",
  "Selenium",
  "Cypress",
  "Refactoring",
  "Profiling",
  "Debugging",
  "Visual Studio Code",
  "IntelliJ IDEA",
  "Eclipse",
  "PyCharm",
  "React Native",
  "Flutter",
  "Android Studio",
  "Xamarin",
  "JIRA",
  "Trello",
  "Asana",
  "Microsoft Project",
  "Scrum",
  "Kanban",
  "SAFe",
  "Lean",
  "CI/CD pipelines",
  "Release Automation",
  "Incident Management",
  "AWS CloudFormation",
  "Azure DevOps",
  "GCP Deployment Manager",
  "Data Modeling",
  "Microservices",
  "Monolithic Architecture",
  "Event-Driven Architecture",
  "ARM (Active Risk Manager)",
  "RiskWatch",
  "Postman",
  "Tableau",
  "Power BI",
  "Google Analytics",
  "Confluence",
  "Rally",
  "Lucidchart",
  "Excel (Advanced)",
  "BPMN",
  "Visio",
  "Bizagi",
  "ARIS",
  "UML Modeling",
  "Use Case Diagrams",
  "Sequence Diagrams",
  "Class Diagrams",
  "Figma",
  "Adobe XD",
  "Axure RP",
  "Balsamiq",
  "Salesforce",
  "SAP",
  "Microsoft Dynamics",
  "User Stories",
  "Sprint Planning",
  "Backlog Grooming",
  "APIs",
  "ETL Processes",
  "Middleware",
  "TestRail",
  "Zephyr",
  "HP ALM",
  "Playwright",
  "Appium",
  "Katalon Studio",
  "JMeter",
  "LoadRunner",
  "Gatling",
  "SoapUI",
  "Swagger",
  "OWASP ZAP",
  "Burp Suite",
  "Nessus",
  "Bugzilla",
  "TestLink",
  "CircleCI",
  "Bamboo",
  "Espresso",
  "XCTest",
  "Oracle DB",
  "AWS Device Farm",
  "Sauce Labs",
  "BrowserStack",
  ".NET Developer",
  "Accessibility Specialist",
  "Admin Big Data",
  "Administrative Assistant",
  "Adobe Acrobat Expert",
  "Adobe After Effects Specialist",
  "Adobe Illustrator Expert",
  "Adobe InDesign Expert",
  "Adobe Photoshop Expert",
  "Adobe Premiere Pro Specialist",
  "Agile Project Manager",
  "Airtable Freelancer",
  "Alexa Skill Kit Specialist",
  "Amazon EC2 Specialist",
  "Android App Developer",
  "Android Developer",
  "Android Studio Freelancer",
  "Anime Freelancer",
  "Ansible Automation Engineer",
  "Ansible Operations Engineer",
  "ANSYS Specialist",
  "Apache Spark Specialist",
  "API Developer",
  "App Store Specialist",
  "AppDynamics Engineer",
  "Apple Xcode Specialist",
  "Application Security Engineer",
  "ArcGIS Developer",
  "Arduino Programmer",
  "Artifactory Engineer",
  "Artificial Intelligence (AI) / Machine Learning Engineer",
  "Artificial Intelligence Architect",
  "Artificial Intelligence Engineer",
  "Artificial Intelligence Researcher",
  "ASP.NET Developer",
  "AutoCAD Specialist",
  "AWS Developer",
  "AWS DevOps Engineer",
  "AWS Solutions Architect",
  "Azure DevOps Engineer",
  "Babylon.js Freelancer",
  "Bamboo Engineer",
  "Big Data Architect",
  "Big Data Engineer",
  "Big Data Specialist",
  "BigQuery Developer",
  "Bitbucket Engineer",
  "Blockchain Developer",
  "Bot Developer",
  "Build and Release Engineer",
  "Build Engineer",
  "Business Systems Analyst",
  "C# Developer",
  "C# Developers & Programmer",
  "C++ Programmers & Developer",
  "CAD Designer",
  "Chat Support Specialist",
  "Chatbot Developer",
  "Chief Architect Specialist",
  "Chief Operations Engineer",
  "Chrome Extension Developer",
  "Cloud Administrator",
  "Cloud Architect",
  "Cloud Automation Engineer",
  "Cloud Computing Specialist",
  "Cloud Engineer",
  "Cloud Network Engineer",
  "Cloud Security Engineer",
  "CNC Programmer",
  "CodeIgniter Developer",
  "Coder",
  "Cold Caller",
  "Computational Fluid Dynamics (CFD) Specialist",
  "Computer Hardware Engineer",
  "Computer Network Architect",
  "Computer Programmer",
  "Computer Research Scientist",
  "Computer Systems Analyst",
  "Computer Vision Engineer",
  "Confluence Engineer",
  "Consul Engineer",
  "CorelDRAW Specialist",
  "Coverage.py Engineer",
  "CRM Specialist",
  "CSS Developer",
  "d3.js Developer",
  "Data Analysts",
  "Data Architect",
  "Data Cleansing Analyst",
  "Data Engineer",
  "Data Entry Specialist",
  "Data Extraction Specialist",
  "Data Miner",
  "Data Modeler",
  "Data Scientist",
  "Data Scraper",
  "Data Visualization Specialist",
  "Database Administrator",
  "Database Designer",
  "Datadog Engineer",
  "Delphi Developer",
  "DevOps Architect",
  "DevOps Engineer",
  "DevOps Manager",
  "DevSecOps Architect",
  "DevSecOps Engineer",
  "Django Freelancer",
  "Docker Engineer",
  "Docker Specialist",
  "Electrical Drawing Specialist",
  "Elementor Freelancer",
  "ELK Engineer",
  "Embedded Software Engineer",
  "Engineering Drawing Specialist",
  "Entry Level Developer",
  "Entry Level Network Engineer",
  "Entry Level Programmer",
  "Entry Level Software Developer",
  "Entry Level Software Engineer",
  "Entry Level Web Developer",
  "Erlang Developers & Programmer",
  "ERPNext Specialist",
  "ESP32 Freelancer",
  "Etsy Administration Specialist",
  "Falco Engineer",
  "FFmpeg Specialist",
  "Figma Freelancer",
  "FluentD Engineer",
  "Flutter Developer",
  "Fortify Engineer",
  "Front End Web Developer",
  "Front End Designer",
  "Full Stack Developer",
  "Full Stack Java Developer",
  "Full Stack Python Developer",
  "Fusion 360 Specialist",
  "Game Developer",
  "GCP DevOps Engineer",
  "Gerrit Administrator",
  "Gerrit Engineer",
  "Git Engineer",
  "GitHub Engineer",
  "GitLab Engineer",
  "Gradle Engineer",
  "Grafana Engineer",
  "Groovy Engineer",
  "Information Architect",
  "Information Security Analyst",
  "iOS Developer",
  "Istio Engineer",
  "IT Manager",
  "JaCoCo Engineer",
  "Java Developer",
  "JavaScript Developer",
  "Jenkins Engineer",
  "Jira Administrator",
  "JIRA Engineer",
  "JUnit Engineer",
  "Kubernetes Administrator",
  "Kubernetes Engineer",
  "Kubernetes Operations Engineer",
  "Machine Learning Architect",
  "Machine Learning Engineer",
  "Microservices / API Lead Designer",
  "Mobile Application Developer",
  "Mulesoft Developer",
  "Nagios Engineer",
  "Network and Systems Administrator",
  "Network Engineer",
  "New Grad Software Engineer",
  "Nexus Engineer",
  "Nomad Engineer",
  "Notary Engineer",
  "Octopus Deploy Engineer",
  "OpenShift Engineer",
  "OpenStack Engineer",
  "Operations Engineer",
  "Oracle Developer",
  "Oracle SQL Developer",
  "Packer Engineer",
  "PHP Developer",
  "Powershell Engineer",
  "Principal Engineer in Artificial Intelligence",
  "Principal Engineer in Big Data",
  "Principal Engineer in Data Analysis",
  "Principal Engineer in Machine Learning",
  "Product Manager",
  "Production Support Engineer",
  "Programmer",
  "Prometheus Engineer",
  "Puppet Operations Engineer",
  "PyTest Engineer",
  "Python Developer",
  "Quality Assurance Specialist",
  "QA Engineer",
  "React Developer",
  "Robotics Engineer",
  "Ruby on Rails Developer",
  "Salesforce Developer",
  "Search Engine Optimization",
  "Security Specialist",
  "Selenium Engineer",
  "Senior Ansible Development Engineer",
  "Senior Build and Release Engineer",
  "Senior Build Engineer",
  "Senior Cloud Architect",
  "Senior DevOps Architect",
  "Senior DevOps Engineer",
  "Senior DevSecOps Architect",
  "Senior DevSecOps Engineer",
  "Senior Site Reliability Engineer",
  "SharePoint Developer",
  "Site Reliability Engineer (Kubernetes – Docker)",
  "Software Engineer",
  "SonarQube Engineer",
  "Splunk Engineer",
  "Splunk Enterprise Security Engineer",
  "SQL Developer",
  "SRE Architect",
  "SRE Engineer",
  "Systems Administrator",
  "Tech Sales Engineer",
  "Technical Account Manager",
  "Technical Lead",
  "Terraform Engineer",
  "TFS Engineer",
  "Twistlock Engineer",
  "UDeploy Engineer",
  "UI Designer",
  "UI Developer",
  "Unity Developer",
  "UX Designer",
  "Vault Engineer",
  "Web Designer (UI/UX Designer)",
  "Web Developer",
  "WordPress Developer",
  "XL Deploy Engineer",
  "Zabbix Engineer",
];
let selectedSkills = [];

// Show suggestions based on input
skillsInput.addEventListener("input", () => {
  const inputValue = skillsInput.value.toLowerCase().trim();
  if (inputValue === "") {
    suggestionsList.style.display = "none";
    return;
  }

  const filteredSkills = availableSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue) &&
      !selectedSkills.includes(skill)
  );

  if (filteredSkills.length > 0) {
    suggestionsList.innerHTML = filteredSkills
      .map((skill) => `<li class="suggestion-item">${skill}</li>`)
      .join("");
    suggestionsList.style.display = "block";
  } else {
    suggestionsList.style.display = "none";
  }
});

// Add a skill when a suggestion is clicked
suggestionsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion-item")) {
    const skill = e.target.textContent.trim();
    addSkill(skill);
    skillsInput.value = ""; // Clear input after selection
    suggestionsList.style.display = "none"; // Hide suggestions
  }
});

// Add skill when Enter is pressed
skillsInput.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === "Tab") && skillsInput.value.trim()) {
    e.preventDefault();
    addSkill(skillsInput.value.trim());
    skillsInput.value = ""; // Clear input after pressing Enter or Next
  }
});

// Handle mobile keyboard "Next" press
skillsInput.addEventListener("input", (e) => {
  if (e.inputType === "insertLineBreak" && skillsInput.value.trim()) {
    addSkill(skillsInput.value.trim());
    skillsInput.value = ""; // Clear input after pressing Next
  }
});

// Add skill function
function addSkill(skill) {
  if (!selectedSkills.includes(skill)) {
    selectedSkills.push(skill);

    const skillTag = document.createElement("div");
    skillTag.className = "skill-tag";
    skillTag.innerHTML = `${skill}<span class="remove-skill" onclick="removeSkill('${skill}')">&times;</span>`;

    selectedSkillsContainer.appendChild(skillTag);
    hiddenSkillsInput.value = selectedSkills.join(",");
  }
  toggleRequiredStyle();
}

function toggleRequiredStyle() {
  if (selectedSkills.length === 0) {
    skillsInput.classList.add("border-red-500", "focus:ring-red-500");
    skillsInput.setAttribute("required", "required");
  } else {
    skillsInput.classList.remove("border-red-500", "focus:ring-red-500");
    skillsInput.removeAttribute("required");
  }
}

// Remove skill function
function removeSkill(skill) {
  // Remove from selectedSkills array
  selectedSkills = selectedSkills.filter((s) => s !== skill);

  hiddenSkillsInput.value = selectedSkills.join(",");

  // Add the skill back to suggestions list
  if (!availableSkills.includes(skill)) {
    availableSkills.push(skill);
  }

  // Update the suggestions list with the newly available skill
  skillsInput.dispatchEvent(new Event("input"));

  // Remove the skill tag from the selected skills container
  const skillTags = Array.from(
    selectedSkillsContainer.getElementsByClassName("skill-tag")
  );
  skillTags.forEach((tag) => {
    if (tag.textContent.includes(skill)) {
      tag.remove();
    }
  });
  toggleRequiredStyle();
}

// Show popup for skills
function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  document.body.style.overflow = "hidden"; // Disable scrolling when popup is open
}

// Close popup for skills
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling again
}

// Close Post a Job Form
function closeForm() {
  const formContainer = document.querySelector(".form-container");
  formContainer.style.display = "none"; // Hide the form when close is clicked
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!document.getElementById("skills-container").contains(e.target)) {
    suggestionsList.style.display = "none";
  }
});

function submitJobPost() {
  const form = document.getElementById("job-form");
  const inputs = form.querySelectorAll("input, select, textarea");
  let valid = true;

  // Loop through all the inputs to check if they are required and empty
  inputs.forEach((input) => {
    if (input.required && !input.value.trim()) {
      valid = false;
      input.style.borderColor = "red"; // Highlight the missing field
    } else {
      input.style.borderColor = ""; // Reset border if the field is filled
    }
  });

  // If the form is valid, submit it; otherwise, show an alert
  if (valid) {
    // If validation passes, submit the form manually
    form.submit();
  } else {
    alert("Please fill all required fields.");
  }
}
// pop up of post a job modal
// Open the modal when Get Started button is clicked

// document.addEventListener("DOMContentLoaded", () => {
function openModal() {
  document.getElementById("exampleModal").classList.remove("hidden");
}

// Close the modal (for the close button inside modal)
function closeModal() {
  document.getElementById("exampleModal").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  const budgetRanges = {
    USD: [
      "Less than 12",
      "12 - 60",
      "60 - 120",
      "120 - 240",
      "240 - 600",
      "600 - 2,400",
      "2,400 - 6,000",
      "6,000 - 12,000",
      "12,000 - 24,000",
      "More than 24,000",
    ],
    EUR: [
      "Less than 12",
      "12 - 60",
      "60 - 120",
      "120 - 240",
      "240 - 600",
      "600 - 2,400",
      "2,400 - 6,000",
      "6,000 - 12,000",
      "12,000 - 24,000",
      "More than 24,000",
    ],
    JPY: [
      "Less than 1,800",
      "1,800 - 9,000",
      "9,000 - 18,000",
      "18,000 - 36,000",
      "36,000 - 90,000",
      "90,000 - 360,000",
      "360,000 - 900,000",
      "900,000 - 1,800,000",
      "1,800,000 - 3,600,000",
      "More than 3,600,000",
    ],
    GBP: [
      "Less than 10",
      "10 - 50",
      "50 - 100",
      "100 - 200",
      "200 - 500",
      "500 - 2,000",
      "2,000 - 5,000",
      "5,000 - 10,000",
      "10,000 - 20,000",
      "More than 20,000",
    ],
    CNY: [
      "Less than 90",
      "90 - 450",
      "450 - 900",
      "900 - 1,800",
      "1,800 - 4,500",
      "4,500 - 18,000",
      "18,000 - 45,000",
      "45,000 - 90,000",
      "90,000 - 180,000",
      "More than 180,000",
    ],
    AUD: [
      "Less than 20",
      "20 - 100",
      "100 - 200",
      "200 - 400",
      "400 - 1,000",
      "1,000 - 4,000",
      "4,000 - 10,000",
      "10,000 - 20,000",
      "20,000 - 40,000",
      "More than 40,000",
    ],
    CAD: [
      "Less than 18",
      "18 - 90",
      "90 - 180",
      "180 - 360",
      "360 - 900",
      "900 - 3,600",
      "3,600 - 9,000",
      "9,000 - 18,000",
      "18,000 - 36,000",
      "More than 36,000",
    ],
    CHF: [
      "Less than 12",
      "12 - 60",
      "60 - 120",
      "120 - 240",
      "240 - 600",
      "600 - 2'400",
      "2'400 - 6'000",
      "6'000 - 12'000",
      "12'000 - 24'000",
      "More than 24'000",
    ],
    INR: [
      "Less than 1,000",
      "1,000 - 5,000",
      "5,000 - 10,000",
      "10,000 - 20,000",
      "20,000 - 50,000",
      "50,000 - 2,00,000",
      "2,00,000 - 5,00,000",
      "5,00,000 - 10,00,000",
      "10,00,000 - 20,00,000",
      "More than 20,00,000",
    ],
    NZD: [
      "Less than 20",
      "20 - 100",
      "100 - 200",
      "200 - 400",
      "400 - 1,000",
      "1,000 - 4,000",
      "4,000 - 10,000",
      "10,000 - 20,000",
      "20,000 - 40,000",
      "More than 40,000",
    ],
  };

  const currencySelect = document.getElementById("currency");
  const budgetRangeSelect = document.getElementById("budget-range");

  function updateBudgetRanges() {
    const selectedCurrency = currencySelect.value;
    budgetRangeSelect.innerHTML = ""; // Clear existing options

    budgetRanges[selectedCurrency].forEach((range) => {
      const option = document.createElement("option");
      option.textContent = range;
      budgetRangeSelect.appendChild(option);
    });
  }

  currencySelect.addEventListener("change", updateBudgetRanges);

  updateBudgetRanges(); // Initialize with default selection
});
