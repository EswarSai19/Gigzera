// // javascript for certificate modal popup
// const fileInputcert = document.getElementById("file-input-cert");
// const uploadedFiles = document.getElementById("uploaded-file-cert");
// const fileNameSpan = document.getElementById("file-name-cert");
// const fileSizeSpan = document.getElementById("file-size-cert");
// const issueDateInput = document.getElementById("issue-date");
// const expiryDateInput = document.getElementById("expiry-date");
// const certificationNameInput = document.getElementById("certification-name");
// const certificationIdInput = document.getElementById("certification-id");
// const certificationUrlInput = document.getElementById("certification-url");
// const saveButton = document.getElementById("save-button");

// // Reference to the modal element
// const addCertificateModal = new bootstrap.Modal(
//   document.getElementById("addCertificateModal")
// );

// fileInputcert.addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     fileNameSpan.textContent = file.name;
//     fileSizeSpan.textContent = (file.size / 1024).toFixed(2) + " KB";
//     uploadedFiles.style.display = "flex";
//   }
// });

// function removeFile() {
//   fileInputcert.value = "";
//   uploadedFiles.style.display = "none";
// }

// saveButton.addEventListener("click", (event) => {
//   // Check if file is uploaded
//   if (!fileInputcert.files[0]) {
//     alert("Please upload a file.");
//     return;
//   }
//   if (!certificationNameInput.value) {
//     alert("Please enter a certification name.");
//     return;
//   }
//   //
//   // Check if issue date is filled
//   if (!issueDateInput.value) {
//     alert("Please select an issue date.");
//     return;
//   }

//   // Collect form data
//   const formData = {
//     fileName: fileInputcert.files[0].name,
//     fileSize: (fileInputcert.files[0].size / 1024).toFixed(2) + " KB",
//     issueDate: issueDateInput.value,
//     expiryDate: expiryDateInput.value,
//     certificationName: certificationNameInput.value,
//     certificationId: certificationIdInput.value,
//     certificationUrl: certificationUrlInput.value,
//   };

//   console.log("Certification Data Saved:", formData);

//   // Reset the form fields and clear uploaded file information
//   fileInputcert.value = "";
//   uploadedFiles.style.display = "none";
//   issueDateInput.value = "";
//   expiryDateInput.value = "";
//   certificationNameInput.value = "";
//   certificationIdInput.value = "";
//   certificationUrlInput.value = "";

//   // Close the modal directly
//   addCertificateModal.hide();
// });

// // javascript for employment history popup
// document
//   .getElementById("currentlyWorking")
//   .addEventListener("change", function () {
//     const workedTillField = document.getElementById("workedTill");

//     if (this.checked) {
//       workedTillField.value = ""; // Clear the "Worked Till" field
//       workedTillField.disabled = true; // Disable the field
//       workedTillField.removeAttribute("required"); // Remove required attribute
//     } else {
//       workedTillField.disabled = false; // Enable the field
//       workedTillField.setAttribute("required", "true"); // Make it required
//     }
//   });

// document.getElementById("saveBtn").addEventListener("click", function () {
//   const company = document.getElementById("company").value.trim();
//   const title = document.getElementById("title").value.trim();
//   const city = document.getElementById("city").value.trim();
//   const country = document.getElementById("country").value.trim();
//   const workedFrom = document.getElementById("workedFrom").value;
//   const workedTill = document.getElementById("workedTill").value;
//   const currentlyWorking = document.getElementById("currentlyWorking").checked;
//   const description = document.getElementById("description").value.trim();

//   // Validation
//   if (!company || !title || !city || !country || !workedFrom) {
//     alert("Please fill out all required fields.");
//     return;
//   }

//   // If "I currently work here" is not checked, validate the "Worked Till" field
//   if (!currentlyWorking && !workedTill) {
//     alert("Please specify the Worked Till date.");
//     return;
//   }

//   // Gather form data
//   const workHistory = {
//     company,
//     title,
//     city,
//     country,
//     workedFrom,
//     workedTill: currentlyWorking ? "Present" : workedTill,
//     description,
//   };

//   console.log("Work History Saved:", workHistory);

//   // Close the modal after saving (Bootstrap-specific)
//   const modal = bootstrap.Modal.getInstance(
//     document.getElementById("workHistoryModal")
//   );
//   modal.hide();

//   const form = document.getElementById("workHistoryForm");
//   form.reset();
//   const workedTillField = document.getElementById("workedTill");
//   workedTillField.disabled = false; // Enable the field after reset
//   workedTillField.removeAttribute("required"); // Reset required attribute
// });

//    Right section for editing profile and saving
function enableEditing() {
  const form = document.getElementById("edit-profile-form");
  form.style.display = form.style.display === "none" ? "block" : "none";

  // Pre-fill the form with current values
  document.getElementById("edit-name").value =
    document.getElementById("profile-name").innerText;
  document.getElementById("edit-job").value =
    document.getElementById("profile-job").innerText;
  document.getElementById("edit-email").value = document
    .getElementById("profile-email")
    .innerText.replace("📧 ", "")
    .trim();
  document.getElementById("edit-phone").value = document
    .getElementById("profile-phone")
    .innerText.replace("📱 ", "")
    .trim();
}

function saveEdit() {
  // Save edited values
  document.getElementById("profile-name").innerText =
    document.getElementById("edit-name").value;
  document.getElementById("profile-job").innerText =
    document.getElementById("edit-job").value;
  document.getElementById(
    "profile-email"
  ).innerHTML = `<i class="fa-solid fa-envelope"></i> <a href="mailto:${
    document.getElementById("edit-email").value
  }">${document.getElementById("edit-email").value}</a>`;

  document.getElementById(
    "profile-phone"
  ).innerHTML = `<i class="fa-solid fa-phone"></i> <a href="tel:${
    document.getElementById("edit-phone").value
  }">${document.getElementById("edit-phone").value}</a>`;

  document.getElementById(
    "profile-linkedin"
  ).innerHTML = `<i class="fa-solid fa-share-from-square"></i> <a href="${
    document.getElementById("edit-profile-link").value
  }">${document.getElementById("edit-profile-link").value}</a>`;

  //   document.getElementById(
  //     "profile-phone"
  //   ).innerText = `<i class="fa-solid fa-phone"></i> <a href="tel:${
  //     document.getElementById("edit-phone").value
  //   }">${document.getElementById("edit-phone").value}</a>`;
  //   document.getElementById(
  //     "profile-linkedin"
  //   ).innerText = `<i class="fa-solid fa-share-from-square"></i>${
  //     document.getElementById("edit-profile-link").value
  //   }`;

  // Update profile image if a new image is uploaded
  const fileInputEdit = document.getElementById("file-input-edit");
  if (fileInputEdit.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profile-img").src = e.target.result;
    };
    reader.readAsDataURL(fileInputEdit.files[0]);
  }

  // Hide the edit form
  document.getElementById("edit-profile-form").style.display = "none";
}

function uploadImageEdit() {
  const fileInputEdit = document.getElementById("file-input-edit");
  const file = fileInputEdit.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profile-img").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function deletePhoto() {
  // Set the default placeholder image if photo is deleted
  const defaultImage = "https://via.placeholder.com/100";
  document.getElementById("profile-img").src = defaultImage;

  // Clear file input
  document.getElementById("file-input-edit").value = "";
}

// java script for Professional Summary

// Function to edit Professional Summary section
function editSection(sectionId) {
  const section = document.getElementById(sectionId);
  const textElement = section.querySelector("p");
  const textarea = section.querySelector("textarea");
  const saveButton = section.querySelector("#save-summary");

  // Hide the paragraph and show the textarea and save button
  textElement.style.display = "none";
  textarea.style.display = "block";
  saveButton.style.display = "inline-block";
  textarea.value = textElement.innerText;
}

// Function to save changes in Professional Summary
function saveSummary() {
  const summaryInput = document.getElementById("summary-input");
  const summaryText = document.getElementById("summary-text");
  const saveButton = document.getElementById("save-summary");

  // Save the new value and update the display
  summaryText.innerText = summaryInput.value;

  // Hide the textarea and save button, show the updated paragraph
  summaryInput.style.display = "none";
  saveButton.style.display = "none";
  summaryText.style.display = "block";
}

// Skills array (for filtering and suggestions)
let editMode = false;

const skills = [
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

// Toggle edit mode
function toggleEditMode() {
  editMode = !editMode;
  const inputField = document.getElementById("new-skill");
  const inputField2 = document.getElementById("new-exp");
  const editIcon = document.querySelector(".edit-icon");
  const saveButton = document.querySelector(".save-button-skills");
  const skillInputs = document.querySelectorAll(".experience-box input");
  const deleteButtons = document.querySelectorAll(".delete-skill");
  const suggestionsBox = document.getElementById("suggestions");

  inputField.disabled = !editMode;
  inputField.placeholder = editMode ? "Add a skill..." : "Add a skill...";
  editIcon.style.color = editMode ? "#1e88e5" : "#555";
  saveButton.style.display = editMode ? "inline-block" : "none";

  inputField2.disabled = !editMode;
  inputField2.placeholder = editMode
    ? "Add experience..."
    : "Add experience...";
  editIcon.style.color = editMode ? "#1e88e5" : "#555";
  saveButton.style.display = editMode ? "inline-block" : "none";

  skillInputs.forEach((input) => (input.disabled = !editMode));
  deleteButtons.forEach(
    (button) => (button.style.display = editMode ? "inline" : "none")
  );

  // Hide suggestions when edit mode is turned off
  if (!editMode) {
    suggestionsBox.style.display = "none";
  } else {
    suggestionsBox.style.display = "block";
  }
}

// Save skills and validate
function saveSkills() {
  const skillExperiencePairs = document.querySelectorAll(
    ".skill-experience-pair"
  );
  let allValid = true;

  skillExperiencePairs.forEach((pair) => {
    const experienceBox = pair.querySelector(".experience-box"); // Select the container
    const experienceInput = experienceBox.querySelector("input");
    let errorText = experienceBox.querySelector(".error-text"); // Look inside experience-box

    if (experienceInput.value.trim() === "") {
      experienceInput.style.border = "1px solid red";

      if (!errorText) {
        errorText = document.createElement("div");
        errorText.className = "error-text";
        errorText.textContent = "Please fill out this field.";
        experienceBox.appendChild(errorText); // Append inside the same div
      }

      allValid = false;
    } else {
      experienceInput.style.border = "1px solid #ccc";
      if (errorText) errorText.remove(); // Remove error if input is valid
    }
  });

  if (allValid) {
    toggleEditMode();
    // Hide suggestions box after saving
    document.getElementById("suggestions").style.display = "none";
  }
}

// Filter skills based on input
function filterSkills(event) {
  if (!editMode) return;

  const input = event.target.value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");

  // Initially hide the suggestions box if input is empty
  suggestionsBox.style.display = input ? "block" : "none";

  // Clear previous suggestions
  suggestionsBox.innerHTML = "";

  if (!input) return;

  // Filter the skills array based on user input
  const filteredSkills = skills.filter(
    (skill) => skill.toLowerCase().includes(input) && !isSkillSelected(skill)
  );

  // Add filtered suggestions to the suggestions box
  filteredSkills.forEach((skill) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.className = "suggestion-item";
    suggestionItem.textContent = skill;
    suggestionItem.onclick = () => selectSkill(skill);
    suggestionsBox.appendChild(suggestionItem);
  });
}

// Check if a skill is already selected
function isSkillSelected(skill) {
  const selectedSkills = Array.from(
    document.querySelectorAll(".skill-box")
  ).map((skillBox) => skillBox.textContent.trim().replace("✖", ""));
  return selectedSkills.includes(skill);
}

// Add or edit selected skill with experience input
function selectSkill(skill) {
  if (!editMode) return;

  // const skillsList = document.getElementById("skills-list");
  // const skillExperiencePair = document.createElement("div");
  // skillExperiencePair.className = "skill-experience-pair";

  // const skillBox = document.createElement("span");
  // skillBox.className = "skill-box";
  // skillBox.textContent = skill;

  // const deleteButton = document.createElement("span");
  // deleteButton.className = "delete-skill";
  // deleteButton.textContent = "✖";
  // deleteButton.onclick = () => removeSkill(skillExperiencePair);
  // deleteButton.style.display = editMode ? "inline" : "none";
  // skillBox.appendChild(deleteButton);

  // const experienceBox = document.createElement("div");
  // experienceBox.className = "experience-box";
  // experienceBox.innerHTML = `<input type="number" placeholder="Add experience in years" required min="1" step="1"/>`;

  // skillExperiencePair.appendChild(skillBox);
  // skillExperiencePair.appendChild(experienceBox);
  // skillsList.appendChild(skillExperiencePair);

  document.getElementById("new-skill").value = skill;
  document.getElementById("suggestions").innerHTML = "";
}

// Remove a skill-experience pair
function removeSkill(skillExperiencePair) {
  skillExperiencePair.remove();
}

// Modal for certificate
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex"; // Show the modal by changing its display style
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none"; // Hide the modal
  }
}

// this is editing certificate model:
function showModal2(
  cert_id,
  cert_name,
  issue_date,
  expiry_date,
  certification_id,
  cert_url
) {
  console.log(
    cert_id,
    "cert_id",
    cert_name,
    "cert_name",
    issue_date,
    "issue_date",
    expiry_date,
    "expiry_date",
    certification_id,
    "certification_id",
    cert_url,
    "cert_url"
  );

  // Pre-fill the form fields with the passed values
  document.getElementById("cert_id").value = cert_id;
  document.getElementById("cert_name_").value = cert_name;
  document.getElementById("certification_id_").value = certification_id
    ? certification_id
    : "";
  document.getElementById("cert_url_").value = cert_url ? cert_url : "";

  // Helper function to format date to YYYY-MM-DD in local time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format and set the start and end date values in the form
  document.getElementById("issue_date_").value = formatDate(issue_date);
  document.getElementById("expiry_date_").value = expiry_date
    ? formatDate(expiry_date)
    : "";

  const modal = document.getElementById("addCertificateModal2");
  if (modal) {
    modal.style.display = "flex"; // Show the modal by changing its display style
  }
}

function hideModal2() {
  const modal = document.getElementById("addCertificateModal2");
  if (modal) {
    modal.style.display = "none"; // Hide the modal
  }
}

// Handle file selection
document
  .getElementById("file-input-cert")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file
    const fileUploadContainer = document.getElementById(
      "file-upload-container"
    ); // File upload container

    if (file) {
      const fileName = file.name; // File name
      const fileSize = (file.size / 1024).toFixed(2) + " KB"; // File size in KB

      // Update the file name and size in the modal
      document.getElementById("file-name-cert").textContent = fileName;
      document.getElementById("file-size-cert").textContent = fileSize;

      // Show the uploaded file section
      document.getElementById("uploaded-file-cert").classList.remove("hidden");

      // Remove red border if a file is selected
      fileUploadContainer.classList.remove("border-red-500");
    } else {
      alert("No file selected.");
    }
  });

// handle file section for editing the file
document
  .getElementById("file-input-cert2")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file
    const fileUploadContainer = document.getElementById(
      "file-upload-container2"
    ); // File upload container

    if (file) {
      const fileName = file.name; // File name
      const fileSize = (file.size / 1024).toFixed(2) + " KB"; // File size in KB

      // Update the file name and size in the modal
      document.getElementById("file-name-cert2").textContent = fileName;
      document.getElementById("file-size-cert2").textContent = fileSize;

      // Show the uploaded file section
      document.getElementById("uploaded-file-cert2").classList.remove("hidden");

      // Remove red border if a file is selected
      fileUploadContainer.classList.remove("border-red-500");
    } else {
      alert("No file selected.");
    }
  });

// Function to remove the selected file
function removeFile() {
  const fileUploadContainer = document.getElementById("file-upload-container"); // File upload container
  document.getElementById("file-input-cert").value = ""; // Clear file input
  document.getElementById("uploaded-file-cert").classList.add("hidden"); // Hide the file display section

  // Add the red border back if file is removed
  fileUploadContainer.classList.add("border-red-500");
}

// Function to remove the selected edit file
function removeEditFile() {
  const fileUploadContainer = document.getElementById("file-upload-container2"); // File upload container
  document.getElementById("file-input-cert2").value = ""; // Clear file input
  document.getElementById("uploaded-file-cert2").classList.add("hidden"); // Hide the file display section

  // Add the red border back if file is removed
  fileUploadContainer.classList.add("border-red-500");
}

// Save button logic
// document.getElementById("save-button").addEventListener("click", function () {
//   const form = document.querySelector(".certification-form");
//   const fileInput = document.getElementById("file-input-cert");
//   const fileUploadContainer = document.getElementById("file-upload-container");

//   // Check if the form is valid
//   if (form.checkValidity()) {
//     if (fileInput.files.length === 0) {
//       // Add a red border to the file upload container if no file is selected
//       fileUploadContainer.classList.add("border-red-500");
//       return; // Prevent form submission
//     } else {
//       // Remove the red border if a file is selected
//       fileUploadContainer.classList.remove("border-red-500");
//     }

//     // Proceed with saving if form and file input are valid
//     form.reset();
//     document.getElementById("uploaded-file-cert").classList.add("hidden");
//     fileUploadContainer.classList.remove("border-red-500");
//     hideModal("addCertificateModal");
//   } else {
//     form.reportValidity();
//   }
// });

// Function to show the modal
function openModal() {
  const modal = document.getElementById("workHistoryModal");
  modal.classList.remove("hidden");
}

function openModal2(
  job_id,
  company,
  city,
  country,
  job_title,
  description,
  start_date,
  end_date,
  currently_working
) {
  console.log(
    job_id,
    company,
    city,
    country,
    job_title,
    description,
    start_date,
    end_date,
    currently_working
  );

  // Pre-fill the form fields with the passed values
  document.getElementById("job_id").value = job_id;
  document.getElementById("company_").value = company;
  document.getElementById("city_").value = city;
  document.getElementById("country_").value = country;
  document.getElementById("job_title_").value = job_title;
  document.getElementById("description_").value = description;

  // Helper function to format date to YYYY-MM-DD in local time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format and set the start and end date values in the form
  document.getElementById("start_date_").value = formatDate(start_date);
  document.getElementById("end_date_").value = end_date
    ? formatDate(end_date)
    : "";

  // Ensure currently_working is a boolean before setting the checkbox
  const isCurrentlyWorking =
    currently_working === true ||
    currently_working === "true" ||
    currently_working === 1 ||
    currently_working === "on"; // In case the backend sends "on"
  const currentlyWorkingCheckbox =
    document.getElementById("currently_working_");
  currentlyWorkingCheckbox.checked = isCurrentlyWorking;

  // Trigger the toggle function to disable 'Worked Till' field if needed
  toggleWorkedTill2();

  // Show the modal
  const modal = document.getElementById("workHistoryModal2");
  modal.classList.remove("hidden");
}

// Ensure toggle works when checkbox is manually clicked
document
  .getElementById("currently_working_")
  .addEventListener("change", toggleWorkedTill2);

// Function to toggle the 'Worked Till' field based on 'Currently Working' checkbox
function toggleWorkedTill2() {
  const workedTill = document.getElementById("end_date_");
  const currentlyWorking = document.getElementById("currently_working_");

  if (currentlyWorking.checked) {
    workedTill.disabled = true;
    workedTill.value = ""; // Clear the value if currently working
  } else {
    workedTill.disabled = false;
  }
}

// Function to hide the modal
function closeModal() {
  const modal = document.getElementById("workHistoryModal");
  modal.classList.add("hidden");
}

function closeModal2() {
  const modal = document.getElementById("workHistoryModal2");
  modal.classList.add("hidden");
}

// Function to toggle the 'Worked Till' field based on 'Currently Working' checkbox
function toggleWorkedTill() {
  const workedTill = document.getElementById("workedTill");
  const currentlyWorking = document.getElementById("currentlyWorking");

  if (currentlyWorking.checked) {
    // Disable the 'Worked Till' field and clear its value
    workedTill.disabled = true;
    workedTill.value = "";
  } else {
    // Enable the 'Worked Till' field
    workedTill.disabled = false;
  }
}

// Function to validate the form
function validateForm() {
  // Get form elements
  const company = document.getElementById("company");
  const title = document.getElementById("title");
  const city = document.getElementById("city");
  const country = document.getElementById("country");
  const workedFrom = document.getElementById("workedFrom");
  const workedTill = document.getElementById("workedTill");
  const currentlyWorking = document.getElementById("currentlyWorking"); // Checkbox for currently working

  // Check if fields are filled
  let isValid = true;

  // Validate Company
  if (company.value.trim() === "") {
    document.getElementById("company-error").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("company-error").classList.add("hidden");
  }

  // Validate Title
  if (title.value.trim() === "") {
    document.getElementById("title-error").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("title-error").classList.add("hidden");
  }

  // Validate City
  if (city.value.trim() === "") {
    document.getElementById("city-error").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("city-error").classList.add("hidden");
  }

  // Validate Country
  if (country.value.trim() === "") {
    document.getElementById("country-error").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("country-error").classList.add("hidden");
  }

  // Validate Worked From
  if (workedFrom.value === "") {
    document.getElementById("workedFrom-error").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("workedFrom-error").classList.add("hidden");
  }

  // Validate Worked Till (if not "currently working")
  if (!currentlyWorking.checked && workedTill.value === "") {
    document.getElementById("workedTill-error").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("workedTill-error").classList.add("hidden");
  }

  // If all fields are valid, submit the form
  if (isValid) {
    document.getElementById("workHistoryForm").submit();
  }
}

// Add an event listener to handle checkbox changes
document
  .getElementById("currentlyWorking")
  .addEventListener("change", toggleWorkedTill);
