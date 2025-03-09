// javascript for progress
// Function to toggle the visibility of the progress edit form
function toggleProgressEdit() {
  const progressEditForm = document.getElementById("progressEditForm");

  // Toggle the 'hidden' class
  if (progressEditForm.classList.contains("hidden")) {
    progressEditForm.classList.remove("hidden"); // Show the edit form
  } else {
    progressEditForm.classList.add("hidden"); // Hide the edit form
  }
}

// Function to update the progress bar and reset the UI
function updateProgress() {
  const newProgress = document.getElementById("newProgress").value;
  const progressFill = document.getElementById("progressFill");
  const progressPercentage = document.getElementById("progressPercentage");
  const lastUpdatedBy = document.getElementById("lastUpdatedBy");
  const lastUpdatedTime = document.getElementById("lastUpdatedTime");

  // Validate and update the progress
  if (newProgress >= 0 && newProgress <= 100) {
    progressFill.style.width = `${newProgress}%`; // Update progress bar width
    progressPercentage.textContent = `${newProgress}%`; // Update percentage
    lastUpdatedBy.textContent = "Current User"; // Update the user
    lastUpdatedTime.textContent = "just now"; // Update the timestamp

    // Hide the edit form
    toggleProgressEdit();
  } else {
    alert("Please enter a value between 0 and 100.");
  }
}

// javascript for skills
// New part of the file
// const skillsInput = document.getElementById("skills-required");
// const suggestionsList = document.getElementById("suggestions-list");
// const selectedSkillsContainer = document.getElementById("selected-skills");
// const hiddenSkillsInput = document.getElementById("skills-list"); // Hidden input
// const availableSkills = [
//   "Python",
//   "Java",
//   "JavaScript",
//   "C#",
//   "C++",
//   "Ruby",
//   "PHP",
//   "Kotlin",
//   "Swift",
//   "HTML5",
//   "CSS3",
//   "React.js",
//   "Angular",
//   "Vue.js",
//   "SASS",
//   "Bootstrap",
//   "Node.js",
//   "Django",
//   "Flask",
//   "Spring Boot",
//   ".NET",
//   "Express.js",
//   "SQL",
//   "PostgreSQL",
//   "MongoDB",
//   "MySQL",
//   "Oracle",
//   "Redis",
//   "Git",
//   "GitHub",
//   "GitLab",
//   "Bitbucket",
//   "Docker",
//   "Kubernetes",
//   "Jenkins",
//   "Ansible",
//   "Terraform",
//   "AWS",
//   "Azure",
//   "Google Cloud Platform (GCP)",
//   "RESTful APIs",
//   "GraphQL",
//   "SOAP",
//   "Jest",
//   "Mocha",
//   "Jasmine",
//   "Selenium",
//   "Cypress",
//   "Refactoring",
//   "Profiling",
//   "Debugging",
//   "Visual Studio Code",
//   "IntelliJ IDEA",
//   "Eclipse",
//   "PyCharm",
//   "React Native",
//   "Flutter",
//   "Android Studio",
//   "Xamarin",
//   "JIRA",
//   "Trello",
//   "Asana",
//   "Microsoft Project",
//   "Scrum",
//   "Kanban",
//   "SAFe",
//   "Lean",
//   "CI/CD pipelines",
//   "Release Automation",
//   "Incident Management",
//   "AWS CloudFormation",
//   "Azure DevOps",
//   "GCP Deployment Manager",
//   "Python",
//   "JavaScript",
//   "SQL",
//   "Data Modeling",
//   "Microservices",
//   "Monolithic Architecture",
//   "Event-Driven Architecture",
//   "ARM (Active Risk Manager)",
//   "RiskWatch",
//   "Postman",
//   "Tableau",
//   "Power BI",
//   "Google Analytics",
//   "JIRA",
//   "Confluence",
//   "Rally",
//   "Lucidchart",
//   "SQL",
//   "Excel (Advanced)",
//   "Power BI",
//   "Tableau",
//   "BPMN",
//   "Visio",
//   "Bizagi",
//   "ARIS",
//   "UML Modeling",
//   "Use Case Diagrams",
//   "Sequence Diagrams",
//   "Class Diagrams",
//   "Postman",
//   "Selenium",
//   "Figma",
//   "Adobe XD",
//   "Axure RP",
//   "Balsamiq",
//   "Salesforce",
//   "SAP",
//   "Microsoft Dynamics",
//   "User Stories",
//   "Sprint Planning",
//   "Backlog Grooming",
//   "APIs",
//   "ETL Processes",
//   "Middleware",
//   "TestRail",
//   "Zephyr",
//   "HP ALM",
//   "Selenium",
//   "Cypress",
//   "Playwright",
//   "Appium",
//   "Katalon Studio",
//   "JMeter",
//   "LoadRunner",
//   "Gatling",
//   "Postman",
//   "SoapUI",
//   "Swagger",
//   "OWASP ZAP",
//   "Burp Suite",
//   "Nessus",
//   "Git",
//   "GitHub",
//   "JIRA",
//   "Bugzilla",
//   "TestLink",
//   "Jenkins",
//   "CircleCI",
//   "Bamboo",
//   "Python",
//   "Java",
//   "JavaScript",
//   "Appium",
//   "Espresso",
//   "XCTest",
//   "SQL",
//   "Oracle DB",
//   "AWS Device Farm",
//   "Sauce Labs",
//   "BrowserStack",
//   ".NET Developer",
//   "Accessibility Specialist",
//   "Admin Big Data",
//   "Administrative Assistant",
//   "Adobe Acrobat Expert",
//   "Adobe After Effects Specialist",
//   "Adobe Illustrator Expert",
//   "Adobe InDesign Expert",
//   "Adobe Photoshop Expert",
//   "Adobe Premiere Pro Specialist",
//   "Agile Project Manager",
//   "Airtable Freelancer",
//   "Alexa Skill Kit Specialist",
//   "Amazon EC2 Specialist",
//   "Android App Developer",
//   "Android Developer",
//   "Android Studio Freelancer",
//   "Anime Freelancer",
//   "Ansible Automation Engineer",
//   "Ansible Operations Engineer",
//   "ANSYS Specialist",
//   "Apache Spark Specialist",
//   "API Developer",
//   "App Store Specialist",
//   "AppDynamics Engineer",
//   "Apple Xcode Specialist",
//   "Application Security Engineer",
//   "ArcGIS Developer",
//   "Arduino Programmer",
//   "Artifactory Engineer",
//   "Artificial Intelligence (AI) / Machine Learning Engineer",
//   "Artificial intelligence / Machine Learning Engineer",
//   "Artificial intelligence Architect",
//   "Artificial Intelligence Engineer",
//   "Artificial Intelligence Researcher",
//   "ASP.NET Developer",
//   "AutoCAD Specialist",
//   "AWS Developer",
//   "AWS DevOps Engineer",
//   "AWS Solutions Architect",
//   "Azure DevOps Engineer",
//   "Babylon.js Freelancer",
//   "Bamboo Engineer",
//   "Big Data Architect",
//   "Big Data Engineer",
//   "Big Data Specialist",
//   "BigQuery Developer",
//   "Bitbucket Engineer",
//   "Blockchain Developer",
//   "Bot Developer",
//   "Build and Release Engineer",
//   "Build Engineer",
//   "Business Systems Analyst",
//   "C# Developer",
//   "C# Developers & Programmer",
//   "C++ Programmers & Developer",
//   "CAD Designer",
//   "Chat Support Specialist",
//   "Chatbot Developer",
//   "Chief Architect Specialist",
//   "Chief Operations Engineer",
//   "Chrome Extension Developer",
//   "Cloud administrator",
//   "Cloud Architect",
//   "Cloud automation engineer",
//   "Cloud Computing Specialist",
//   "Cloud engineer",
//   "Cloud network engineer",
//   "Cloud Security Engineer",
//   "CNC Programmer",
//   "CodeIgniter Developer",
//   "Coder",
//   "Cold Caller",
//   "Computational Fluid Dynamics (CFD) Specialist",
//   "Computer Hardware Engineer",
//   "Computer Network Architect",
//   "Computer Programmer",
//   "Computer Research Scientist",
//   "Computer Systems Analyst",
//   "Computer Vision Engineer",
//   "Confluence Engineer",
//   "Consul Engineer",
//   "CorelDRAW Specialist",
//   "Coverage.py Engineer",
//   "CRM Specialist",
//   "CSS Developer",
//   "d3.js Developer",
//   "Data Analysts",
//   "Data Architect",
//   "Data Cleansing Analyst",
//   "Data Engineer",
//   "Data Entry Specialist",
//   "Data Extraction Specialist",
//   "Data Miner",
//   "Data Modeler",
//   "Data Scientist",
//   "Data Scraper",
//   "Data Visualization Specialist",
//   "Database Administrator",
//   "Database Designer",
//   "Datadog Engineer",
//   "Delphi Developer",
//   "DevOps Architect",
//   "DevOps Engineer",
//   "Devops Manager",
//   "DevSecOps Architect",
//   "DevSecOps Engineer",
//   "Django Freelancer",
//   "Docker Engineer",
//   "Docker Specialist",
//   "Electrical Drawing Specialist",
//   "Elementor Freelancer",
//   "ELK Engineer",
//   "Embedded Software Engineer",
//   "Engineering Drawing Specialist",
//   "Entry Level Developer",
//   "Entry Level Network Engineer",
//   "Entry Level Programmer",
//   "Entry Level Software Developer",
//   "Entry Level Software Engineer",
//   "Entry Level Web Developer",
//   "Erlang Developers & Programmer",
//   "ERPNext Specialist",
//   "ESP32 Freelancer",
//   "Etsy Administration Specialist",
//   "Falco Engineer",
//   "FFmpeg Specialist",
//   "Figma Freelancer",
//   "FluentD Engineer",
//   "Flutter Developer",
//   "Fortify Engineer",
//   "Front End Web Developer",
//   "Front end Desiner",
//   "Full Stack Developer",
//   "Full Stack JAVA Developer/Programmer/Engineer",
//   "Full Stack Python Developer/Programmer/Engineer",
//   "Fusion 360 Specialist",
//   "Game Developer",
//   "GCP DevOps Engineer",
//   "Gerrit Administrator",
//   "Gerrit Engineer",
//   "Git Engineer",
//   "Github Engineer",
//   "GitLab Engineer",
//   "Gradle Engineer",
//   "Grafana Engineer",
//   "Groovy Engineer",
//   "Information Architect",
//   "Information Security Analyst",
//   "IOS Developer",
//   "Istio Engineer",
//   "IT Manager",
//   "JaCoCO Engineer",
//   "Java Developer",
//   "JavaScript Developer",
//   "Jenkins Engineer",
//   "Jira Administrator",
//   "JIRA Engineer",
//   "JUnit Engineer",
//   "kubernetes Administrator",
//   "Kubernetes Engineer",
//   "Kubernetes Operations Engineer",
//   "Machine learning Architect",
//   "Machine Learning Engineer",
//   "Micro services / API Lead Designer",
//   "Mobile Application Developer",
//   "Mulesoft Developer",
//   "Nagios Engineer",
//   "Network and Systems Administrator",
//   "Network Engineer",
//   "New Grad Software Engineer",
//   "Nexus Engineer",
//   "Nomad Engineer",
//   "Notary Engineer",
//   "Octopus Deploy Engineer",
//   "OpenShift Engineer",
//   "OpenStack Engineer",
//   "Operations Engineer",
//   "Oracle Developer",
//   "Oracle SQL Developer",
//   "Packer Engineer",
//   "PHP Developer",
//   "Powershell Engineer",
//   "Principle Engineer in Artificial Intelligence",
//   "Principle Engineer in Big Data",
//   "Principle Engineer in Data Analysis",
//   "Principle Engineer in Machine Learning",
//   "Product Manager",
//   "Production Support Engineer",
//   "Programmer",
//   "Prometheus Engineer",
//   "Puppet Operations Engineer",
//   "PyTest Engineer",
//   "Python Developer",
//   "Quality Assurance Specialist",
//   "QA Engineer",
//   "React Developer",
//   "Robotics Engineer",
//   "Ruby on rails Developer",
//   "Salesforce Developer",
//   "Search Engine Optimization",
//   "Security Specialist",
//   "Selenium Engineer",
//   "Senior Ansible Development Engineer",
//   "Senior Build and Release Engineer",
//   "Senior Build Engineer",
//   "Senior Cloud Architect",
//   "Senior DevOps Architect",
//   "Senior DevOps Engineer",
//   "Senior DevSecOps Architect",
//   "Senior DevSecOps Engineer",
//   "Senior Site reliability Engineer",
//   "Sharepoint Developer",
//   "Site Reliability Engineer (Kubernetes – Docker)",
//   "Software Engineer",
//   "SonarQube Engineer",
//   "Splunk Engineer",
//   "Splunk Enterprise Security Engineer",
//   "SQL Developer",
//   "SRE Architect",
//   "SRE Engineer",
//   "Systems Administrator",
//   "Tech Sales Engineer",
//   "Technical Account Manager",
//   "Technical Lead",
//   "Terraform Engineer",
//   "TFS Engineer",
//   "Twistkock Engineer",
//   "UDeploy Engineer",
//   "UI DESIGNER",
//   "UI Developer",
//   "Unity Developer",
//   "UX DESIGNER",
//   "Vault Engineer",
//   "Web Designer (UI/UX Designer)",
//   "Web Developer",
//   "WordPress Developer",
//   "XL Deploy Engineer",
//   "Zabbix Engineer",
// ];
// let selectedSkills = [];

// // Show suggestions based on input
// skillsInput.addEventListener("input", () => {
//   const inputValue = skillsInput.value.toLowerCase().trim();
//   if (inputValue === "") {
//     suggestionsList.style.display = "none";
//     return;
//   }

//   const filteredSkills = availableSkills.filter(
//     (skill) =>
//       skill.toLowerCase().includes(inputValue) &&
//       !selectedSkills.includes(skill)
//   );

//   if (filteredSkills.length > 0) {
//     suggestionsList.innerHTML = filteredSkills
//       .map((skill) => `<li class="suggestion-item">${skill}</li>`)
//       .join("");
//     suggestionsList.style.display = "block";
//   } else {
//     suggestionsList.style.display = "none";
//   }
// });

// // Add a skill when a suggestion is clicked
// suggestionsList.addEventListener("click", (e) => {
//   if (e.target.classList.contains("suggestion-item")) {
//     const skill = e.target.textContent.trim();
//     addSkill(skill);
//     skillsInput.value = ""; // Clear input after selection
//     suggestionsList.style.display = "none"; // Hide suggestions
//   }
// });

// // Add skill when Enter is pressed
// skillsInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && skillsInput.value.trim()) {
//     e.preventDefault();
//     const skill = skillsInput.value.trim();
//     addSkill(skill);
//     skillsInput.value = ""; // Clear input after pressing Enter
//   }
// });

// // Add skill function
// function addSkill(skill) {
//   if (!selectedSkills.includes(skill)) {
//     selectedSkills.push(skill);

//     const skillTag = document.createElement("div");
//     skillTag.className = "skill-tag";
//     skillTag.innerHTML = `${skill}<span class="remove-skill" onclick="removeSkill('${skill}')">&times;</span>`;

//     selectedSkillsContainer.appendChild(skillTag);
//     hiddenSkillsInput.value = selectedSkills.join(",");
//   }
//   toggleRequiredStyle();
// }

// function toggleRequiredStyle() {
//   if (selectedSkills.length === 0) {
//     skillsInput.classList.add("border-red-500", "focus:ring-red-500");
//     skillsInput.setAttribute("required", "required");
//   } else {
//     skillsInput.classList.remove("border-red-500", "focus:ring-red-500");
//     skillsInput.removeAttribute("required");
//   }
// }

// // Remove skill function
// function removeSkill(skill) {
//   // Remove from selectedSkills array
//   selectedSkills = selectedSkills.filter((s) => s !== skill);

//   hiddenSkillsInput.value = selectedSkills.join(",");

//   // Add the skill back to suggestions list
//   if (!availableSkills.includes(skill)) {
//     availableSkills.push(skill);
//   }

//   // Update the suggestions list with the newly available skill
//   skillsInput.dispatchEvent(new Event("input"));

//   // Remove the skill tag from the selected skills container
//   const skillTags = Array.from(
//     selectedSkillsContainer.getElementsByClassName("skill-tag")
//   );
//   skillTags.forEach((tag) => {
//     if (tag.textContent.includes(skill)) {
//       tag.remove();
//     }
//   });
//   toggleRequiredStyle();
// }

// Show popup for skills
// function showPopup() {
//   const popup = document.getElementById("popup");
//   popup.style.display = "block";
//   document.body.style.overflow = "hidden"; // Disable scrolling when popup is open
// }

// // Close popup for skills
// function closePopup() {
//   const popup = document.getElementById("popup");
//   popup.style.display = "none";
//   document.body.style.overflow = "auto"; // Enable scrolling again
// }

// // Close Post a Job Form
// function closeForm() {
//   const formContainer = document.querySelector(".form-container");
//   formContainer.style.display = "none"; // Hide the form when close is clicked
// }

// // Hide suggestions when clicking outside
// document.addEventListener("click", (e) => {
//   if (!document.getElementById("skills-container").contains(e.target)) {
//     suggestionsList.style.display = "none";
//   }
// });

// function submitJobPost() {
//   const form = document.getElementById("job-form");
//   const inputs = form.querySelectorAll("input, select, textarea");
//   let valid = true;

//   // Loop through all the inputs to check if they are required and empty
//   inputs.forEach((input) => {
//     if (input.required && !input.value.trim()) {
//       valid = false;
//       input.style.borderColor = "red"; // Highlight the missing field
//     } else {
//       input.style.borderColor = ""; // Reset border if the field is filled
//     }
//   });

//   // If the form is valid, submit it; otherwise, show an alert
//   if (valid) {
//     // If validation passes, submit the form manually
//     form.submit();
//   } else {
//     alert("Please fill all required fields.");
//   }
// }
// pop up of post a job modal
// Open the modal when Get Started button is clicked

// document.addEventListener("DOMContentLoaded", () => {
// function openModal() {
//   document.getElementById("exampleModal").classList.remove("hidden");
// }

// // Close the modal (for the close button inside modal)
// function closeModal() {
//   document.getElementById("exampleModal").classList.add("hidden");
// }

// New function for hadling the update progress
document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("updateProgress");

  if (!form) return; // Ensure form exists before adding event listeners

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent full page reload

    // Enable status dropdown before submitting
    // let statusDropdown = form.querySelector("#projectStatus");
    // statusDropdown.disabled = false;

    let formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()) // Get raw response
      .then((text) => {
        try {
          let data = JSON.parse(text);
          if (data.success) {
            alert(data.message);
            let progressBar = document.querySelector("#progressFill");
            let newProgress = form.querySelector("#newProgress").value;
            progressBar.style.width = newProgress + "%";

            document.getElementById("progressEditForm").classList.add("hidden");
          } else {
            alert("Error: " + data.error);
          }
        } catch (error) {
          console.error("JSON Parsing Error:", text); // ✅ Log the unexpected response
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  });

  // Initialize progress bar on page load
  let progressElement = document.getElementById("progressFill");
  if (progressElement) {
    let progressValue = parseInt(progressElement.dataset.progress, 10) || 0;
    progressElement.style.width = progressValue + "%";
  }
});

// New task functions
// javascript for task box
// JavaScript to add new task when button is clicked
// document.getElementById("addTaskBtn").addEventListener("click", () => {
//   const taskList = document.querySelector(".task-list");

//   // Create new task div
//   const newTask = document.createElement("div");
//   newTask.classList.add("task");
//   newTask.innerHTML = `
//     <div class="task-row">
//       <input type="checkbox" class="task-checkbox">
//       <label class="task-title">New Task</label>
//       <i class="fa-solid fa-pen-to-square edit-icon"></i>
//       <select>
//          <option>Requirement Gathering</option>
//                   <option>Designing</option>
//                   <option>Development</option>
//                   <option>Testing</option>
//                   <option>UAT</option>
//                   <option>Completed</option>
//       </select>
//     </div>
//     <div class="task-comment">
//      <button onclick="openChatModal()" class="comment-button" disabled>
//       Add Comment
//       </button>
//     </div>
//   `;

//   taskList.appendChild(newTask);
//   addEditFunctionality(newTask);
// });

// document.getElementById("deleteSelectedBtn").addEventListener("click", () => {
//   const tasks = document.querySelectorAll(".task");
//   tasks.forEach((task) => {
//     const checkbox = task.querySelector(".task-checkbox");
//     if (checkbox.checked) {
//       task.remove();
//     }
//   });
// });

function addEditFunctionality(task) {
  const editIcon = task.querySelector(".edit-icon");
  const title = task.querySelector(".task-title");
  const commentButton = task.querySelector(".comment-button");

  editIcon.addEventListener("click", () => {
    if (editIcon.classList.contains("editing")) {
      // Save and reset after editing
      title.contentEditable = "false";
      commentButton.disabled = true;
      editIcon.classList.remove("editing");
      editIcon.style.color = "#007bff"; // Reset icon color
    } else {
      // Enable editing
      title.contentEditable = "true";
      commentButton.disabled = false;
      title.focus();
      editIcon.classList.add("editing");
      editIcon.style.color = "#0056b3"; // Indicate editing mode
    }
  });
  // Open comment modal and set task reference
  commentButton.addEventListener("click", () => {
    if (!commentButton.disabled) {
      openChatModal(task);
    }
  });
}

// Initialize edit functionality for existing tasks
// document
//   .querySelectorAll(".task")
//   .forEach((task) => addEditFunctionality(task));

// Open the message modal when clicking 'Add Comment'
// function openChatModal(taskId) {
//   console.log("Taskid", taskId);
//   document.getElementById("msgTaskId").value = taskId;
//   document.getElementById("chatModal").classList.remove("hidden");
// }

// function openChatModal(taskId) {
//   document.getElementById("msgtaskId").value = taskId;
//   document.getElementById("chatModal").classList.remove("hidden");
// }

// Close the message modal
// function closeChatModal() {
//   document.getElementById("chatModal").classList.add("hidden");
// }

// Send a new message and display it in the message area
// function sendNewMessage() {
//   const input = document.getElementById("newMessageInput");
//   const container = document.getElementById("messageArea");

//   if (input.value.trim()) {
//     const messageDiv = document.createElement("div");
//     messageDiv.className = "message-box outgoing mb-3";
//     messageDiv.innerHTML = `
//       <img src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg" alt="User Avatar" class="avatar-img">
//           <div class="message-content-box">
//               <p>${input.value}</p>
//               <span class="time-stamp">just now</span>
//           </div>
//       `;
//     container.appendChild(messageDiv);
//     input.value = "";
//     container.scrollTop = container.scrollHeight;
//   }
// }

// javascript for message box

// function sendNewMessage(event) {
//   event.preventDefault(); // Prevent form from submitting

//   const input = document.getElementById("newMessageInput");
//   const container = document.getElementById("messageArea");

//   if (input.value.trim()) {
//     const messageDiv = document.createElement("div");
//     messageDiv.className = "message-box outgoing mb-3";
//     messageDiv.innerHTML = `
//       <img src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg" alt="User Avatar" class="avatar-img">
//           <div class="message-content-box">
//               <p>${input.value}</p>
//               <span class="time-stamp">just now</span>
//           </div>
//       `;
//     container.appendChild(messageDiv);
//     container.scrollTop = container.scrollHeight;

//     // Submit form manually via AJAX
//     sendMessageToServer(input.value);

//     // Clear input field
//     input.value = "";
//   }
// }

// function sendMessageToServer(message) {
//   console.log("I am coming bro", message);
//   const msgTaskId = document.getElementById("msgTaskId").value;

//   // Get CSRF token from the cookie instead of the DOM
//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   }

//   const csrftoken = getCookie("csrftoken");
//   const url = document.getElementById("messageForm").getAttribute("data-url");

//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "X-CSRFToken": csrftoken,
//     },
//     body: `user_message=${encodeURIComponent(
//       message
//     )}&msgTaskId=${encodeURIComponent(msgTaskId)}`,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Message sent successfully:", data);
//     })
//     .catch((error) => {
//       console.error("Error sending message:", error);
//     });
// }

// Function to open chat modal and load existing messages

// Function to open chat modal and load existing messages
// Function to open chat modal and load existing messages
function openChatModal(taskId) {
  console.log("Taskid", taskId);
  document.getElementById("msgTaskId").value = taskId;
  document.getElementById("chatModal").classList.remove("hidden");

  // Clear previous messages
  const messageArea = document.getElementById("messageArea");
  messageArea.innerHTML = "";

  // Fetch existing messages for this task
  fetch(`/client/get-comments/?taskId=${encodeURIComponent(taskId)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Convert comments object to array for sorting
        const messagesArray = Object.keys(data.comments).map((key) => {
          // Extract timestamp from the key (assuming format: userID_timestamp)
          const timestamp = parseInt(key.split("_")[1]);
          const userId = key.split("_")[0];
          return {
            key: key,
            userId: userId,
            timestamp: timestamp,
            message: data.comments[key].message,
            time: data.comments[key].time,
          };
        });

        // Sort messages by timestamp (chronological order)
        messagesArray.sort((a, b) => a.timestamp - b.timestamp);

        // Render each message in the chat
        messagesArray.forEach((messageObj) => {
          // Check if the message is from a client (starts with CL)
          const isClientMessage = messageObj.userId.startsWith("CL");
          addMessageToUI(messageObj.message, messageObj.time, isClientMessage);
        });

        // Scroll to bottom of message area
        messageArea.scrollTop = messageArea.scrollHeight;
      } else {
        console.error("Error loading comments:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
}

// Function to send a new message
function sendNewMessage(event) {
  event.preventDefault();

  const messageInput = document.getElementById("newMessageInput");
  const messageText = messageInput.value.trim();
  const taskId = document.getElementById("msgTaskId").value;

  if (messageText) {
    // Add message to UI immediately (optimistic UI update)
    // Since this is the client interface, all sent messages are client messages
    addMessageToUI(messageText, "Sending...", true);

    // Send to server
    const form = document.getElementById("messageForm");
    const url = form.getAttribute("data-url");

    // Get CSRF token
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const csrftoken = getCookie("csrftoken");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrftoken,
      },
      body: `user_message=${encodeURIComponent(
        messageText
      )}&msgTaskId=${encodeURIComponent(taskId)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Message sent successfully:", data);

          // Update the "Sending..." text with the actual time
          const messages = document.querySelectorAll(".message-box");
          const lastMessage = messages[messages.length - 1];
          const timeSpan = lastMessage.querySelector(".time-stamp");
          timeSpan.textContent = data.messageTime;
        } else {
          console.error("Error sending message:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    // Clear input field
    messageInput.value = "";

    // Focus back on input field for next message
    messageInput.focus();
  }
}

// Function to add a message to the UI
function addMessageToUI(messageText, timeStamp, isClientMessage) {
  const messageArea = document.getElementById("messageArea");

  const messageBox = document.createElement("div");
  // If it's a client message, make it appear on the right side
  messageBox.className = isClientMessage
    ? "message-box outgoing mb-3"
    : "message-box incoming mb-3";

  messageBox.innerHTML = `
    <div class="w-12 h-12 rounded-full bg-blue-500 text-white flex justify-center items-center text-sm font-bold">
      <span id="profile-initials">CL</span>
    </div>
    <div class="message-content-box">
      <p>${messageText}</p>
      <span class="time-stamp">${timeStamp}</span>
    </div>
  `;

  messageArea.appendChild(messageBox);
  messageArea.scrollTop = messageArea.scrollHeight;
}

// Function to close the chat modal
function closeChatModal() {
  document.getElementById("chatModal").classList.add("hidden");
}

// function sendMessage() {
//   const input = document.getElementById("messageInput");
//   const container = document.getElementById("messagesContainer");

//   if (input.value.trim()) {
//     const messageDiv = document.createElement("div");
//     messageDiv.className = "message sent";
//     messageDiv.innerHTML = `
//         <img
//         src="  https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
//         alt="User Avatar"
//         class="user-avatar"
//       />
//             <div class="message-content">
//                 <p>${input.value}</p>
//                 <span class="message-time">just now</span>
//             </div>
//         `;
//     container.appendChild(messageDiv);
//     input.value = "";
//     container.scrollTop = container.scrollHeight;
//   }
// }

// New funciton for adding and deleting tasks
// document.addEventListener("DOMContentLoaded", function () {
//   // Delete Selected Tasks
//   document
//     .getElementById("deleteSelectedBtn")
//     ?.addEventListener("click", function () {
//       let selectedTasks = document.querySelectorAll(".task-checkbox:checked");
//       let taskIds = Array.from(selectedTasks).map((task) => task.dataset.id);

//       if (taskIds.length === 0) {
//         alert("Please select at least one task to delete.");
//         return;
//       }

//       if (confirm("Are you sure you want to delete selected tasks?")) {
//         fetch("/delete_tasks/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
//               .value, // ✅ Include CSRF token
//           },
//           body: new URLSearchParams({ "task_ids[]": taskIds }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             alert(data.message);
//             if (data.success) window.location.reload();
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             alert("Something went wrong while deleting tasks.");
//           });
//       }
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("deleteSelectedBtn")
//     ?.addEventListener("click", function () {
//       let selectedTasks = document.querySelectorAll(".task-checkbox:checked");
//       // ✅ Get the value instead of dataset
//       let taskIds = Array.from(selectedTasks).map((task) => task.value);

//       if (taskIds.length === 0 || taskIds.every((id) => id === "")) {
//         alert("Please select at least one task to delete.");
//         return;
//       }
//       console.log(taskIds, "taskids");

//       if (confirm("Are you sure you want to delete selected tasks?")) {
//         let form = document.getElementById("deleteTaskForm");

//         // Remove any previous hidden inputs
//         document
//           .querySelectorAll("#deleteTaskForm input[name='task_ids[]']")
//           .forEach((input) => input.remove());

//         // Append new hidden inputs for each task
//         taskIds.forEach((id) => {
//           let input = document.createElement("input");
//           input.type = "hidden";
//           input.name = "task_ids[]"; // 🔹 Ensuring correct key
//           input.value = id;
//           form.appendChild(input);
//         });

//         // Submit the form
//         form.submit();
//         window.location.reload();
//       }
//     });
// });

function sendMessage(event) {
  event.preventDefault();

  const messageInput = document.getElementById("chatMessageInput");
  const messageText = messageInput.value.trim();
  const msgId = document.getElementById("chatMsgId").value;
  console.log("i am getting message id as ", msgId);

  if (messageText) {
    // Add message to UI immediately (optimistic UI update)
    addMessageToMsgUI(messageText, "Sending...", true);

    // Get form and URL
    const form = document.getElementById("chatMessageForm");
    const url = form.getAttribute("data-url");

    // Get CSRF token
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const csrftoken = getCookie("csrftoken");
    console.log(url, "Here is the url");
    // Send request
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrftoken,
      },
      body: `user_message=${encodeURIComponent(
        messageText
      )}&msgId=${encodeURIComponent(msgId)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Message sent successfully:", data);

          // Update "Sending..." text with actual time
          const messages = document.querySelectorAll(".message-box");
          const lastMessage = messages[messages.length - 1];
          const timeSpan = lastMessage.querySelector(".time-stamp");
          timeSpan.textContent = data.messageTime;
          // location.reload();
          fetchLatestMessages();
        } else {
          console.error("Error sending message:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    // Clear input field and refocus

    messageInput.value = "";
    messageInput.focus();
  }
}

function addMessageToMsgUI(messageText, timeStamp, isClientMessage) {
  const messageArea = document.getElementById("messagesContainer");

  const messageBox = document.createElement("div");
  // If it's a client message, make it appear on the right side
  messageBox.className = isClientMessage ? "message sent" : "message received";

  messageBox.innerHTML = `
    <div class="message-content-box">
      <p>${messageText}</p>
      <span class="time-stamp">${timeStamp}</span>
    </div>
  `;

  messageArea.appendChild(messageBox);
  messageArea.scrollTop = messageArea.scrollHeight;
}

//
// latest messages
function fetchLatestMessages() {
  const ongpId = new URLSearchParams(window.location.search).get("ongpId");
  if (!ongpId) return;

  fetch(`/client/get-latest-messages/?ongpId=${ongpId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error:", data.error);
        return;
      }

      const messagesContainer = document.getElementById("messagesContainer");
      messagesContainer.innerHTML = ""; // Clear old messages

      Object.entries(data.messages).forEach(([key, msg]) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "flex", "items-center", "gap-2");

        if (key.startsWith("CL")) {
          messageDiv.classList.add("sent");
          messageDiv.innerHTML = `
            <div class="message-content bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                <p>${msg.message}</p>
                <span class="message-time text-xs text-gray-200">${msg.time}</span>
            </div>
        `;
        } else {
          messageDiv.classList.add("received");
          const senderInitials = key.substring(0, 2); // Get first two letters dynamically
          messageDiv.innerHTML = `
            <div class="w-20 h-20 rounded-full bg-blue-500 text-white flex justify-center items-center text-sm font-bold">
                <span id="profile-initials">${senderInitials}</span>
            </div>
            <div class="message-content bg-gray-200 text-black p-2 rounded-lg max-w-xs">
                <p>${msg.message}</p>
                <span class="message-time text-xs text-gray-600">${msg.time}</span>
            </div>
        `;
        }
        messagesContainer.appendChild(messageDiv);
      });

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch((error) => console.error("Fetch error:", error));
}
// setInterval(fetchLatestMessages, 5000);
document.addEventListener("DOMContentLoaded", fetchLatestMessages);

//
document
  .getElementById("chatMessageInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents new line in the input
      document.querySelector(".chat-send-btn").click(event); // Triggers the button click
    }
  });

document
  .getElementById("newMessageInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents new line in the input
      document.querySelector(".send-message-btn").click(event); // Triggers the button click
    }
  });

//
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("deleteSelectedBtn")
    ?.addEventListener("click", function (event) {
      event.preventDefault();

      let selectedTasks = document.querySelectorAll(".task-checkbox:checked");
      let taskIds = Array.from(selectedTasks).map((task) => task.value);

      if (taskIds.length === 0 || taskIds.every((id) => id === "")) {
        alert("Please select at least one task to delete.");
        return;
      }
      console.log("taskIds:", taskIds);

      if (confirm("Are you sure you want to delete selected tasks?")) {
        let deleteTaskForm = document.getElementById("deleteTaskForm");

        // Remove any previous hidden inputs
        document
          .querySelectorAll("#deleteTaskForm input[name='task_ids[]']")
          .forEach((input) => input.remove());

        // Append new hidden inputs for each task
        taskIds.forEach((id) => {
          let input = document.createElement("input");
          input.type = "hidden";
          input.name = "task_ids[]";
          input.value = id;
          deleteTaskForm.appendChild(input);
        });

        // ✅ Submit using fetch to get the JSON response
        let delFormData = new FormData(deleteTaskForm);
        fetch(deleteTaskForm.action, {
          method: "POST",
          body: delFormData,
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message || "Tasks deleted successfully."); // ✅ Show JSON response
            window.location.reload(); // ✅ Reload after showing alert
          })
          .catch((error) => {
            alert("Error deleting tasks. Please try again.");
            console.error("Error:", error);
          });
      }
    });
});

// Add task model popup
document.addEventListener("DOMContentLoaded", function () {
  const taskFormPopup = document.getElementById("taskFormPopup");
  const addTaskForm = document.getElementById("addTaskForm");

  // Show task form
  window.showTaskForm = function () {
    taskFormPopup.classList.remove("hidden");
  };

  // Hide task form
  window.hideTaskForm = function () {
    taskFormPopup.classList.add("hidden");
  };

  // Handle form submission
  addTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(this.action, {
      method: "POST",
      body: new FormData(this),
    })
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        if (data.success) {
          alert("Task added successfully!");
          hideTaskForm();
          window.location.reload(); // Reload the page
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong! Please try again.");
      });
  });
});

// updating the task

document.addEventListener("DOMContentLoaded", function () {
  // Ensure title updates correctly
  document.querySelectorAll(".task-title").forEach((label) => {
    label.addEventListener("blur", function () {
      updateHiddenInput(this);
    });
  });

  // Ensure correct form is submitted via AJAX
  document.querySelectorAll(".task-status").forEach((select) => {
    select.addEventListener("change", function () {
      submitUpdateForm(this);
    });
  });

  function updateHiddenInput(element) {
    let taskElement = element.closest(".task-row");
    let hiddenInput = taskElement.querySelector(".task-title-input");
    hiddenInput.value = element.innerText.trim();

    // Submit update via AJAX
    submitUpdateForm(element);
  }

  function submitUpdateForm(element) {
    let form = element.closest(".update-task-form");

    // Prevent default form submission
    event.preventDefault();

    let formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": form.querySelector("[name=csrfmiddlewaretoken]").value,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Task updated successfully!");
          window.location.reload(); // Refresh the page
        } else {
          alert("Error: " + (data.error || "Something went wrong!"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the task.");
      });
  }
});

// For mobile styles
// for mobile
document.addEventListener("DOMContentLoaded", function () {
  const leftNavButton = document.querySelector(
    ".nav-buttons button:first-child"
  );
  const rightNavButton = document.querySelector(
    ".nav-buttons button:last-child"
  );
  const sidebar = document.querySelector(".sidebar");
  const messages = document.querySelector(".messages");

  function isMobileView() {
    return window.innerWidth <= 768; // Adjust breakpoint as needed
  }

  leftNavButton.addEventListener("click", function () {
    if (isMobileView()) {
      sidebar.classList.toggle("show-sidebar");
    }
  });

  rightNavButton.addEventListener("click", function () {
    if (isMobileView()) {
      messages.classList.toggle("show-messages");
    }
  });

  // Close sidebar and messages when clicking outside
  document.addEventListener("click", function (event) {
    if (isMobileView()) {
      if (
        !sidebar.contains(event.target) &&
        !leftNavButton.contains(event.target)
      ) {
        sidebar.classList.remove("show-sidebar");
      }
      if (
        !messages.contains(event.target) &&
        !rightNavButton.contains(event.target)
      ) {
        messages.classList.remove("show-messages");
      }
    }
  });
});

function closePopup() {
  document.querySelector(".sidebar").classList.remove("show-sidebar");
  document.querySelector(".messages").classList.remove("show-messages");
}
