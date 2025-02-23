// const fullNameInput = document.getElementById("fullName");

// fullNameInput.addEventListener("input", function (event) {
//   // Allow only alphabets, spaces, and remove any invalid characters
//   this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
// });

//code for skills input
document.addEventListener("DOMContentLoaded", () => {
  const skillSuggestions = [
    "Python",
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

  const selectedSkills = new Set(); // Track selected skills globally

  function createAutocomplete(inputElement, suggestionsContainer) {
    inputElement.addEventListener("focus", () => {
      suggestionsContainer.innerHTML = ""; // Clear previous suggestions on focus
    });

    inputElement.addEventListener("input", () => {
      const query = inputElement.value.trim().toLowerCase();
      if (query) {
        suggestionsContainer.style.display = "block"; // Show suggestions when typing

        // Filter suggestions based on input query and already selected skills
        const filteredSuggestions = skillSuggestions.filter(
          (skill) =>
            skill.toLowerCase().includes(query) && !selectedSkills.has(skill)
        );

        suggestionsContainer.innerHTML = ""; // Clear existing suggestions
        filteredSuggestions.forEach((suggestion) => {
          const suggestionElement = document.createElement("div");
          suggestionElement.classList.add(
            "p-2",
            "cursor-pointer",
            "text-sm",
            "text-left"
          );
          suggestionElement.textContent = suggestion;

          suggestionElement.addEventListener("click", () => {
            inputElement.value = suggestion; // Set the selected suggestion as input value
            selectedSkills.add(suggestion); // Mark the skill as selected
            suggestionsContainer.style.display = "none"; // Hide suggestions after selection

            // Re-enable suggestions for all other fields
            updateAllInputs();
          });

          suggestionsContainer.appendChild(suggestionElement);
        });
      } else {
        suggestionsContainer.style.display = "none"; // Hide if input is empty
      }
    });

    inputElement.addEventListener("blur", () => {
      // Hide suggestions when input loses focus
      setTimeout(() => (suggestionsContainer.style.display = "none"), 200);
    });
  }

  function updateAllInputs() {
    // Update all inputs by filtering out selected skills from their suggestions
    const skillInputs = document.querySelectorAll(".skill-input");
    skillInputs.forEach((input) => {
      const suggestionsContainer = input.parentNode.querySelector(
        ".suggestions-container"
      );
      suggestionsContainer.style.display = "none"; // Hide suggestions when updating

      // Refresh autocomplete functionality for each input field with the updated skill set
      input.dispatchEvent(new Event("focus"));
    });
  }

  // Attach autocomplete to each skill input field
  createAutocomplete(
    document.querySelector("#skill1"),
    document.querySelector("#suggestions-container1")
  );
  createAutocomplete(
    document.querySelector("#skill2"),
    document.querySelector("#suggestions-container2")
  );
  createAutocomplete(
    document.querySelector("#skill3"),
    document.querySelector("#suggestions-container3")
  );
});
//password validation
// function toggleVisibility(passwordFieldId, toggleIconId) {
//   const passwordField = document.querySelector(`#${passwordFieldId}`);
//   const toggleIcon = document.querySelector(`#${toggleIconId}`);

//   toggleIcon.addEventListener("click", () => {
//     const isPasswordVisible = passwordField.type === "password";
//     passwordField.type = isPasswordVisible ? "text" : "password";
//     toggleIcon.classList.toggle("fa-eye-slash");
//   });
// }

// toggleVisibility("password", "togglePassword");
// toggleVisibility("confirmPassword", "toggleConfirmPassword");

// Script for phone number
const countrySelect = document.getElementById("country-code");
const phoneInput = document.getElementById("phone-number");
const errorMessage = document.getElementById("error-message");
const sendOtpButton = document.getElementById("send-otp");
const otpSection = document.getElementById("otp-section");
const otpInput = document.getElementById("otp-input");
const validateOtpButton = document.getElementById("validate-otp");
const otpError = document.getElementById("otp-error");

// Define validation rules for different countries
const phoneValidationRules = {
  "+93": {
    pattern: /^\d{9}$/,
    message: "Afghanistan phone numbers must be 9 digits.",
  },
  "+1": { pattern: /^\d{10}$/, message: "US phone numbers must be 10 digits." },
  "+355": {
    pattern: /^\d{8}$/,
    message: "Albania phone numbers must be 8 digits.",
  },
  "+91": {
    pattern: /^\d{10}$/,
    message: "India phone numbers must be 10 digits.",
  },
  "+376": {
    pattern: /^\d{6}$/,
    message: "Andorra phone numbers must be 6 digits.",
  },
  "+244": {
    pattern: /^\d{9}$/,
    message: "Angola phone numbers must be 9 digits.",
  },
  "+54": {
    pattern: /^\d{10}$/,
    message: "Argentina phone numbers must be 10 digits.",
  },
  "+374": {
    pattern: /^\d{8}$/,
    message: "Armenia phone numbers must be 8 digits.",
  },
  "+297": {
    pattern: /^\d{7}$/,
    message: "Aruba phone numbers must be 7 digits.",
  },
  "+61": {
    pattern: /^\d{9}$/,
    message: "Australia phone numbers must be 9 digits.",
  },
  "+43": {
    pattern: /^\d{10}$/,
    message: "Austria phone numbers must be 10 digits.",
  },
  "+994": {
    pattern: /^\d{9}$/,
    message: "Azerbaijan phone numbers must be 9 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Bahamas phone numbers must be 10 digits.",
  },
  "+973": {
    pattern: /^\d{8}$/,
    message: "Bahrain phone numbers must be 8 digits.",
  },
  "+880": {
    pattern: /^\d{10}$/,
    message: "Bangladesh phone numbers must be 10 digits.",
  },
  "+375": {
    pattern: /^\d{9}$/,
    message: "Belarus phone numbers must be 9 digits.",
  },
  "+32": {
    pattern: /^\d{8}$/,
    message: "Belgium phone numbers must be 8 digits.",
  },
  "+501": {
    pattern: /^\d{8}$/,
    message: "Belize phone numbers must be 8 digits.",
  },
  "+229": {
    pattern: /^\d{8}$/,
    message: "Benin phone numbers must be 8 digits.",
  },
  "+673": {
    pattern: /^\d{7}$/,
    message: "Brunei phone numbers must be 7 digits.",
  },
  "+359": {
    pattern: /^\d{8}$/,
    message: "Bulgaria phone numbers must be 8 digits.",
  },
  "+226": {
    pattern: /^\d{8}$/,
    message: "Burkina Faso phone numbers must be 8 digits.",
  },
  "+257": {
    pattern: /^\d{8}$/,
    message: "Burundi phone numbers must be 8 digits.",
  },
  "+855": {
    pattern: /^\d{9}$/,
    message: "Cambodia phone numbers must be 9 digits.",
  },
  "+237": {
    pattern: /^\d{9}$/,
    message: "Cameroon phone numbers must be 9 digits.",
  },
  "+238": {
    pattern: /^\d{7}$/,
    message: "Cape Verde phone numbers must be 7 digits.",
  },
  "+345": {
    pattern: /^\d{7}$/,
    message: "Cayman Islands phone numbers must be 7 digits.",
  },
  "+56": {
    pattern: /^\d{9}$/,
    message: "Chile phone numbers must be 9 digits.",
  },
  "+86": {
    pattern: /^\d{11}$/,
    message: "China phone numbers must be 11 digits.",
  },
  "+57": {
    pattern: /^\d{10}$/,
    message: "Colombia phone numbers must be 10 digits.",
  },
  "+269": {
    pattern: /^\d{7}$/,
    message: "Comoros phone numbers must be 7 digits.",
  },
  "+242": {
    pattern: /^\d{8}$/,
    message: "Congo phone numbers must be 8 digits.",
  },
  "+243": {
    pattern: /^\d{9}$/,
    message: "Democratic Republic of Congo phone numbers must be 9 digits.",
  },
  "+682": {
    pattern: /^\d{4}$/,
    message: "Cook Islands phone numbers must be 4 digits.",
  },
  "+506": {
    pattern: /^\d{8}$/,
    message: "Costa Rica phone numbers must be 8 digits.",
  },
  "+225": {
    pattern: /^\d{8}$/,
    message: "Ivory Coast phone numbers must be 8 digits.",
  },
  "+45": {
    pattern: /^\d{8}$/,
    message: "Denmark phone numbers must be 8 digits.",
  },
  "+253": {
    pattern: /^\d{7}$/,
    message: "Djibouti phone numbers must be 7 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Dominica phone numbers must be 10 digits.",
  },
  "+670": {
    pattern: /^\d{4}$/,
    message: "East Timor phone numbers must be 4 digits.",
  },
  "+593": {
    pattern: /^\d{9}$/,
    message: "Ecuador phone numbers must be 9 digits.",
  },
  "+20": {
    pattern: /^\d{9}$/,
    message: "Egypt phone numbers must be 9 digits.",
  },
  "+503": {
    pattern: /^\d{8}$/,
    message: "El Salvador phone numbers must be 8 digits.",
  },
  "+240": {
    pattern: /^\d{7}$/,
    message: "Equatorial Guinea phone numbers must be 7 digits.",
  },
  "+291": {
    pattern: /^\d{7}$/,
    message: "Eritrea phone numbers must be 7 digits.",
  },
  "+372": {
    pattern: /^\d{8}$/,
    message: "Estonia phone numbers must be 8 digits.",
  },
  "+251": {
    pattern: /^\d{9}$/,
    message: "Ethiopia phone numbers must be 9 digits.",
  },
  "+500": {
    pattern: /^\d{4}$/,
    message: "Falkland Islands phone numbers must be 4 digits.",
  },
  "+298": {
    pattern: /^\d{6}$/,
    message: "Faroe Islands phone numbers must be 6 digits.",
  },
  "+679": {
    pattern: /^\d{7}$/,
    message: "Fiji phone numbers must be 7 digits.",
  },
  "+358": {
    pattern: /^\d{9}$/,
    message: "Finland phone numbers must be 9 digits.",
  },
  "+33": {
    pattern: /^\d{10}$/,
    message: "France phone numbers must be 10 digits.",
  },
  "+594": {
    pattern: /^\d{9}$/,
    message: "French Guiana phone numbers must be 9 digits.",
  },
  "+241": {
    pattern: /^\d{7}$/,
    message: "Gabon phone numbers must be 7 digits.",
  },
  "+220": {
    pattern: /^\d{7}$/,
    message: "Gambia phone numbers must be 7 digits.",
  },
  "+995": {
    pattern: /^\d{9}$/,
    message: "Georgia phone numbers must be 9 digits.",
  },
  "+49": {
    pattern: /^\d{10}$/,
    message: "Germany phone numbers must be 10 digits.",
  },
  "+233": {
    pattern: /^\d{9}$/,
    message: "Ghana phone numbers must be 9 digits.",
  },
  "+350": {
    pattern: /^\d{8}$/,
    message: "Gibraltar phone numbers must be 8 digits.",
  },
  "+30": {
    pattern: /^\d{10}$/,
    message: "Greece phone numbers must be 10 digits.",
  },
  "+299": {
    pattern: /^\d{6}$/,
    message: "Greenland phone numbers must be 6 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Grenada phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Guam phone numbers must be 10 digits.",
  },
  "+502": {
    pattern: /^\d{8}$/,
    message: "Guatemala phone numbers must be 8 digits.",
  },
  "+44": {
    pattern: /^\d{10}$/,
    message: "United Kingdom phone numbers must be 10 digits.",
  },
  "+224": {
    pattern: /^\d{9}$/,
    message: "Guinea phone numbers must be 9 digits.",
  },
  "+245": {
    pattern: /^\d{9}$/,
    message: "Guinea-Bissau phone numbers must be 9 digits.",
  },
  "+592": {
    pattern: /^\d{7}$/,
    message: "Guyana phone numbers must be 7 digits.",
  },
  "+509": {
    pattern: /^\d{8}$/,
    message: "Haiti phone numbers must be 8 digits.",
  },
  "+504": {
    pattern: /^\d{8}$/,
    message: "Honduras phone numbers must be 8 digits.",
  },
  "+852": {
    pattern: /^\d{8}$/,
    message: "Hong Kong phone numbers must be 8 digits.",
  },
  "+36": {
    pattern: /^\d{9}$/,
    message: "Hungary phone numbers must be 9 digits.",
  },
  "+354": {
    pattern: /^\d{7}$/,
    message: "Iceland phone numbers must be 7 digits.",
  },
  "+91": {
    pattern: /^\d{10}$/,
    message: "India phone numbers must be 10 digits.",
  },
  "+62": {
    pattern: /^\d{10}$/,
    message: "Indonesia phone numbers must be 10 digits.",
  },
  "+980": {
    pattern: /^\d{10}$/,
    message: "Iran phone numbers must be 10 digits.",
  },
  "+964": {
    pattern: /^\d{9}$/,
    message: "Iraq phone numbers must be 9 digits.",
  },
  "+353": {
    pattern: /^\d{9}$/,
    message: "Ireland phone numbers must be 9 digits.",
  },
  "+972": {
    pattern: /^\d{9}$/,
    message: "Israel phone numbers must be 9 digits.",
  },
  "+39": {
    pattern: /^\d{10}$/,
    message: "Italy phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Jamaica phone numbers must be 10 digits.",
  },
  "+81": {
    pattern: /^\d{10}$/,
    message: "Japan phone numbers must be 10 digits.",
  },
  "+962": {
    pattern: /^\d{9}$/,
    message: "Jordan phone numbers must be 9 digits.",
  },
  "+7": {
    pattern: /^\d{10}$/,
    message: "Kazakhstan phone numbers must be 10 digits.",
  },
  "+254": {
    pattern: /^\d{10}$/,
    message: "Kenya phone numbers must be 10 digits.",
  },
  "+686": {
    pattern: /^\d{7}$/,
    message: "Kiribati phone numbers must be 7 digits.",
  },
  "+965": {
    pattern: /^\d{8}$/,
    message: "Kuwait phone numbers must be 8 digits.",
  },
  "+996": {
    pattern: /^\d{9}$/,
    message: "Kyrgyzstan phone numbers must be 9 digits.",
  },
  "+856": {
    pattern: /^\d{8}$/,
    message: "Laos phone numbers must be 8 digits.",
  },
  "+371": {
    pattern: /^\d{8}$/,
    message: "Latvia phone numbers must be 8 digits.",
  },
  "+961": {
    pattern: /^\d{8}$/,
    message: "Lebanon phone numbers must be 8 digits.",
  },
  "+266": {
    pattern: /^\d{8}$/,
    message: "Lesotho phone numbers must be 8 digits.",
  },
  "+231": {
    pattern: /^\d{8}$/,
    message: "Liberia phone numbers must be 8 digits.",
  },
  "+218": {
    pattern: /^\d{9}$/,
    message: "Libya phone numbers must be 9 digits.",
  },
  "+423": {
    pattern: /^\d{7}$/,
    message: "Liechtenstein phone numbers must be 7 digits.",
  },
  "+370": {
    pattern: /^\d{8}$/,
    message: "Lithuania phone numbers must be 8 digits.",
  },
  "+352": {
    pattern: /^\d{8}$/,
    message: "Luxembourg phone numbers must be 8 digits.",
  },
  "+853": {
    pattern: /^\d{8}$/,
    message: "Macau phone numbers must be 8 digits.",
  },
  "+389": {
    pattern: /^\d{9}$/,
    message: "North Macedonia phone numbers must be 9 digits.",
  },
  "+261": {
    pattern: /^\d{9}$/,
    message: "Madagascar phone numbers must be 9 digits.",
  },
  "+265": {
    pattern: /^\d{9}$/,
    message: "Malawi phone numbers must be 9 digits.",
  },
  "+60": {
    pattern: /^\d{10}$/,
    message: "Malaysia phone numbers must be 10 digits.",
  },
  "+258": {
    pattern: /^\d{9}$/,
    message: "Mozambique phone numbers must be 9 digits.",
  },
  "+95": {
    pattern: /^\d{9}$/,
    message: "Myanmar phone numbers must be 9 digits.",
  },
  "+264": {
    pattern: /^\d{8}$/,
    message: "Namibia phone numbers must be 8 digits.",
  },
  "+674": {
    pattern: /^\d{7}$/,
    message: "Nauru phone numbers must be 7 digits.",
  },
  "+977": {
    pattern: /^\d{10}$/,
    message: "Nepal phone numbers must be 10 digits.",
  },
  "+31": {
    pattern: /^\d{9}$/,
    message: "Netherlands phone numbers must be 9 digits.",
  },
  "+64": {
    pattern: /^\d{9}$/,
    message: "New Zealand phone numbers must be 9 digits.",
  },
  "+505": {
    pattern: /^\d{8}$/,
    message: "Nicaragua phone numbers must be 8 digits.",
  },
  "+227": {
    pattern: /^\d{8}$/,
    message: "Niger phone numbers must be 8 digits.",
  },
  "+234": {
    pattern: /^\d{10}$/,
    message: "Nigeria phone numbers must be 10 digits.",
  },
  "+683": {
    pattern: /^\d{4}$/,
    message: "Niue phone numbers must be 4 digits.",
  },
  "+850": {
    pattern: /^\d{8}$/,
    message: "North Korea phone numbers must be 8 digits.",
  },
  "+47": {
    pattern: /^\d{8}$/,
    message: "Norway phone numbers must be 8 digits.",
  },
  "+968": {
    pattern: /^\d{8}$/,
    message: "Oman phone numbers must be 8 digits.",
  },
  "+92": {
    pattern: /^\d{10}$/,
    message: "Pakistan phone numbers must be 10 digits.",
  },
  "+680": {
    pattern: /^\d{7}$/,
    message: "Palau phone numbers must be 7 digits.",
  },
  "+507": {
    pattern: /^\d{8}$/,
    message: "Panama phone numbers must be 8 digits.",
  },
  "+675": {
    pattern: /^\d{7}$/,
    message: "Papua New Guinea phone numbers must be 7 digits.",
  },
  "+595": {
    pattern: /^\d{9}$/,
    message: "Paraguay phone numbers must be 9 digits.",
  },
  "+51": {
    pattern: /^\d{9}$/,
    message: "Peru phone numbers must be 9 digits.",
  },
  "+63": {
    pattern: /^\d{10}$/,
    message: "Philippines phone numbers must be 10 digits.",
  },
  "+48": {
    pattern: /^\d{9}$/,
    message: "Poland phone numbers must be 9 digits.",
  },
  "+351": {
    pattern: /^\d{9}$/,
    message: "Portugal phone numbers must be 9 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Puerto Rico phone numbers must be 10 digits.",
  },
  "+974": {
    pattern: /^\d{8}$/,
    message: "Qatar phone numbers must be 8 digits.",
  },
  "+242": {
    pattern: /^\d{8}$/,
    message: "Republic of Congo phone numbers must be 8 digits.",
  },
  "+40": {
    pattern: /^\d{9}$/,
    message: "Romania phone numbers must be 9 digits.",
  },
  "+7": {
    pattern: /^\d{10}$/,
    message: "Russia phone numbers must be 10 digits.",
  },
  "+250": {
    pattern: /^\d{9}$/,
    message: "Rwanda phone numbers must be 9 digits.",
  },
  "+590": {
    pattern: /^\d{9}$/,
    message: "Saint Barthélemy phone numbers must be 9 digits.",
  },
  "+290": {
    pattern: /^\d{4}$/,
    message: "Saint Helena phone numbers must be 4 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Saint Kitts and Nevis phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Saint Lucia phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Dominica phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message:
      "Saint Vincent and the Grenadines phone numbers must be 10 digits.",
  },
  "+677": {
    pattern: /^\d{5}$/,
    message: "Solomon Islands phone numbers must be 5 digits.",
  },
  "+65": {
    pattern: /^\d{8}$/,
    message: "Singapore phone numbers must be 8 digits.",
  },
  "+34": {
    pattern: /^\d{9}$/,
    message: "Spain phone numbers must be 9 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Sint Maarten phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "Sweden phone numbers must be 10 digits.",
  },
  "+248": {
    pattern: /^\d{4}$/,
    message: "Seychelles phone numbers must be 4 digits.",
  },
  "+232": {
    pattern: /^\d{8}$/,
    message: "Sierra Leone phone numbers must be 8 digits.",
  },
  "+421": {
    pattern: /^\d{9}$/,
    message: "Slovakia phone numbers must be 9 digits.",
  },
  "+386": {
    pattern: /^\d{8}$/,
    message: "Slovenia phone numbers must be 8 digits.",
  },
  "+677": {
    pattern: /^\d{5}$/,
    message: "Solomon Islands phone numbers must be 5 digits.",
  },
  "+27": {
    pattern: /^\d{10}$/,
    message: "South Africa phone numbers must be 10 digits.",
  },
  "+34": {
    pattern: /^\d{9}$/,
    message: "Spain phone numbers must be 9 digits.",
  },
  "+94": {
    pattern: /^\d{10}$/,
    message: "Sri Lanka phone numbers must be 10 digits.",
  },
  "+1": {
    pattern: /^\d{10}$/,
    message: "United States phone numbers must be 10 digits.",
  },
  "+58": {
    pattern: /^\d{10}$/,
    message: "Venezuela phone numbers must be 10 digits.",
  },
  "+84": {
    pattern: /^\d{10}$/,
    message: "Vietnam phone numbers must be 10 digits.",
  },
  "+967": {
    pattern: /^\d{9}$/,
    message: "Yemen phone numbers must be 9 digits.",
  },
  "+260": {
    pattern: /^\d{10}$/,
    message: "Zambia phone numbers must be 10 digits.",
  },
  "+263": {
    pattern: /^\d{10}$/,
    message: "Zimbabwe phone numbers must be 10 digits.",
  },
};
// Placeholder for storing OTP (simulate backend OTP generation)
let generatedOtp = "";

// Initialize with the default country code
phoneInput.value = countrySelect.value + " ";

// Listen for changes in the country code dropdown
countrySelect.addEventListener("change", function () {
  const countryCode = this.value;

  // Update the phone input with the selected country code
  phoneInput.value = countryCode + " ";
  errorMessage.classList.add("hidden"); // Hide the error message on country code change
});

// Handle the input and enforce the country-specific length limits
phoneInput.addEventListener("input", function () {
  const countryCode = countrySelect.value;
  const rule = phoneValidationRules[countryCode];
  let phoneNumber = phoneInput.value.replace(countryCode, "").trim();

  // Allow only digits in the phone number
  phoneNumber = phoneNumber.replace(/[^0-9]/g, ""); // Allow only digits

  // Check if a validation rule exists for the selected country
  if (rule) {
    const maxLength = rule.pattern.toString().match(/\d+/g)?.[0]; // Extract the digit count from the pattern
    if (maxLength) {
      // Limit phone number length based on the pattern for the selected country
      phoneNumber = phoneNumber.substring(0, maxLength);
    }
  }

  // Update the phone input value
  phoneInput.value = countryCode + " " + phoneNumber;

  // Validate phone number length
  if (rule && !rule.pattern.test(phoneNumber)) {
    errorMessage.textContent = rule.message;
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
});

// Function to send OTP
function sendOtp(phoneNumber) {
  // Simulating OTP generation (use a backend service in production)
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit OTP
  console.log(`OTP sent to ${phoneNumber}: ${generatedOtp}`); // Log the OTP (for testing)

  // Show the OTP input section
  otpSection.classList.remove("hidden");
}

// Function to validate OTP
function validateOtp(userInput) {
  if (userInput === generatedOtp) {
    alert("Phone number validated successfully!");
    otpSection.classList.add("hidden"); // Hide the OTP section after success
  } else {
    otpError.textContent = "Invalid OTP. Please try again.";
    otpError.classList.remove("hidden");
  }
}

// Handle Send OTP button click
sendOtpButton.addEventListener("click", function () {
  const countryCode = countrySelect.value;
  const phoneNumber = phoneInput.value.replace(countryCode, "").trim();

  if (!phoneNumber || phoneNumber.length < 6) {
    errorMessage.textContent = "Please enter a valid phone number.";
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
    sendOtp(countryCode + " " + phoneNumber); // Send OTP
  }
});

// Handle Validate OTP button click
validateOtpButton.addEventListener("click", function () {
  const userOtp = otpInput.value.trim();
  validateOtp(userOtp);
});

// select the other company
// select the other company
function toggleCustomCompanyInput() {
  const selectElement = document.getElementById("company-select");
  const customInput = document.getElementById("custom-company-input");
  const companyInput = document.getElementById("custom-company");

  if (selectElement.value === "custom") {
    customInput.classList.remove("hidden");
    companyInput.setAttribute("required", "required");
  } else {
    customInput.classList.add("hidden");
    companyInput.removeAttribute("required"); // Remove required when hidden
    companyInput.value = ""; // Clear input
  }
}

function toggleOtherInput() {
  var designationSelect = document.getElementById("designation");
  var otherDesignationContainer = document.getElementById(
    "otherDesignationContainer"
  );
  var designationInput = document.getElementById("otherDesignation");

  if (designationSelect.value === "Other") {
    otherDesignationContainer.classList.remove("hidden");
    designationInput.setAttribute("required", "required");
  } else {
    otherDesignationContainer.classList.add("hidden");
    designationInput.removeAttribute("required"); // Remove required when hidden
    designationInput.value = ""; // Clear input
  }
}

// Script for certificate names
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("certifications");
  const dropdown = document.getElementById("dropdown");
  let selectedCertifications = [];

  // Available certification options
  let certificationOptions = [
    "Google Certified Professional Cloud Architect",
    "AWS Certified Solutions Architect – Associate",
    "Certified Information Security Manager (CISM)",
    "Certified Kubernetes Administrator (CKA)",
    "ISACA Certified in Risk and Information Systems Control (CRISC)",
    "Project Management Professional (PMP®)",
    "Certified Information Systems Security Professional (CISSP)",
    "AWS Certified DevOps Engineer",
    "TOGAF 9 Certification – Foundation",
    "Certified Scrum Master (CSM)",
    "Certified Information Systems Auditor (CISA)",
    "AWS Certified Cloud Practitioner",
    "VMware Certified Professional – Data Center Virtualization",
    "Information Technology Infrastructure Library (ITIL)",
    "Microsoft Certified: Azure Fundamentals",
    "Microsoft Certified: Azure Administrator Associate",
    "AWS Certified Security – Specialty",
    "Nutanix Certified Professional – Multicloud Infrastructure (NCP-MCI)",
    "Others",
  ];

  function handleInput(event) {
    const value = input.value.trim();
    const lastChar = value.slice(-1);

    if (lastChar === ",") {
      input.value = value; // Remove trailing space/comma
      showDropdown();
    } else {
      filterDropdown(value);
    }
  }

  function showDropdown() {
    dropdown.innerHTML = "";
    const filteredOptions = certificationOptions.filter(
      (option) => !selectedCertifications.includes(option)
    );

    if (filteredOptions.length === 0) {
      dropdown.classList.add("hidden");
      return;
    }

    filteredOptions.forEach((option) => {
      const div = document.createElement("div");
      div.className = "p-2 cursor-pointer hover:bg-gray-100";
      div.textContent = option;
      div.onclick = () => selectOption(option);
      dropdown.appendChild(div);
    });

    dropdown.classList.remove("hidden");
  }

  function filterDropdown(value) {
    const searchText = value.split(",").pop().trim().toLowerCase();
    dropdown.innerHTML = "";

    if (searchText) {
      const filteredOptions = certificationOptions
        .filter((option) => !selectedCertifications.includes(option))
        .filter((option) => option.toLowerCase().includes(searchText));

      filteredOptions.forEach((option) => {
        const div = document.createElement("div");
        div.className = "p-2 cursor-pointer hover:bg-gray-100";
        div.textContent = option;
        div.onclick = () => selectOption(option);
        dropdown.appendChild(div);
      });

      dropdown.classList.toggle("hidden", filteredOptions.length === 0);
    } else {
      dropdown.classList.add("hidden");
    }
  }

  function selectOption(value) {
    let currentValues = input.value
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    // Remove last typed fragment (search query) before adding the selected option
    if (currentValues.length > 0) {
      currentValues.pop();
    }

    // Prevent duplicate entries
    if (!selectedCertifications.includes(value)) {
      selectedCertifications.push(value);
    }

    // Format the input field properly
    input.value = selectedCertifications.join(", ");

    showDropdown(); // Refresh dropdown after selection

    // Keep the cursor in the input field
    setTimeout(() => {
      input.focus();
    }, 0);
  }

  function handleBackspace(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
      let currentValues = input.value
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "");

      // Update the selected certifications to match the input field
      selectedCertifications = selectedCertifications.filter((cert) =>
        currentValues.includes(cert)
      );

      showDropdown(); // Update dropdown dynamically
    }
  }

  // Close dropdown when clicking outside the input field
  document.addEventListener("click", (event) => {
    if (!input.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.add("hidden");
    }
  });

  // Attach event listeners
  input.addEventListener("input", handleInput);
  input.addEventListener("keydown", handleBackspace);
});
