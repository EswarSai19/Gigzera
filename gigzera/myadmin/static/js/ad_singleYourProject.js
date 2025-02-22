// Function to toggle the visibility of the progress edit form and enable/disable the status dropdown
function toggleProgressEdit() {
  const progressEditForm = document.getElementById("progressEditForm");
  const statusDropdown = document.getElementById("projectStatus");

  // Toggle the 'hidden' class for the edit form
  if (progressEditForm.classList.contains("hidden")) {
    progressEditForm.classList.remove("hidden"); // Show the edit form
    statusDropdown.disabled = false; // Enable the status dropdown
  } else {
    progressEditForm.classList.add("hidden"); // Hide the edit form
    statusDropdown.disabled = true; // Disable the status dropdown
  }
}

// Function to update the progress bar and reset the UI
function updateProgress() {
  const newProgress = document.getElementById("newProgress").value;
  const progressFill = document.getElementById("progressFill");
  const progressPercentage = document.getElementById("progressPercentage");
  const lastUpdatedBy = document.getElementById("lastUpdatedBy");
  const lastUpdatedTime = document.getElementById("lastUpdatedTime");
  const statusDropdown = document.getElementById("projectStatus");

  // Validate and update the progress
  if (newProgress >= 0 && newProgress <= 100) {
    progressFill.style.width = `${newProgress}%`; // Update progress bar width
    progressPercentage.textContent = `${newProgress}%`; // Update percentage
    lastUpdatedBy.textContent = "Current User"; // Update the user
    lastUpdatedTime.textContent = "just now"; // Update the timestamp

    // Hide the edit form and disable the status dropdown
    toggleProgressEdit();
  } else {
    alert("Please enter a value between 0 and 100.");
  }
}

// javascript for message box
function sendMessage() {
  const input = document.getElementById("messageInput");
  const container = document.getElementById("messagesContainer");

  if (input.value.trim()) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message sent";
    messageDiv.innerHTML = `  
        <img
              src="  https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
              alt="User Avatar"
              class="user-avatar"
            /> 
            <div class="message-content">
                <p>${input.value}</p>  
                <span class="message-time">just now</span>  
            </div>
        `;
    container.appendChild(messageDiv);
    input.value = "";
    container.scrollTop = container.scrollHeight;
  }
}

// JavaScript for Timeline and Finance Sections
// Toggle Edit for Timeline Section
function toggleTimelineEdit(event) {
  event.preventDefault(); // Prevent form from submitting if button is inside the form

  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const updateButton = document.getElementById("updateButton");

  // Toggle disabled state
  const isDisabled = startDate.disabled;
  startDate.disabled = !isDisabled;
  endDate.disabled = !isDisabled;

  // Show or hide the Update button
  if (isDisabled) {
    updateButton.classList.remove("hidden");
  } else {
    updateButton.classList.add("hidden");
  }
}

function toggleFinanceEdit() {
  const financeInputs = document.querySelectorAll(
    ".consultingCharges, .advancePayment, .finance .edit-table select, .milestone-btn, .mile_stone_input"
  );
  const updateFinMilBtn = document.getElementById("updateFinMilBtn");
  const deleteIcons = document.querySelectorAll(
    ".delete-icon, .delete-milestone"
  ); // Include delete-milestone

  // Check current state of inputs
  const isEditing = !financeInputs[0].disabled;

  if (!isEditing) {
    updateFinMilBtn.classList.remove("hidden");
  } else {
    updateFinMilBtn.classList.add("hidden");
    updateFinance(); // Update total cost dynamically before exiting edit mode
  }

  // Toggle disabled state for inputs
  financeInputs.forEach((input) => {
    input.disabled = isEditing;
  });

  // Toggle delete icon functionality (disable outside edit mode)
  deleteIcons.forEach((icon) => {
    if (!isEditing) {
      icon.style.pointerEvents = "auto"; // Enable clicking
      icon.style.opacity = "1"; // Make it fully visible
    } else {
      icon.style.pointerEvents = "none"; // Disable clicking
      icon.style.opacity = "0.5"; // Dim when disabled
    }
  });
}

// Update Total Cost Calculation dynamically when user enters values
function updateFinance() {
  console.log("I am here updateFinance");

  // Function to convert formatted numbers (with commas) to proper floats
  function parseNumber(value) {
    if (!value) return 0; // Handle empty input
    return parseFloat(value.replace(/,/g, "")); // Remove commas and convert
  }

  const laborCost = parseNumber(document.getElementById("laborCost").value);
  const consultingCharges = parseNumber(
    document.getElementById("consultingCharges").value
  );
  const advancePayment = parseNumber(
    document.getElementById("advancePayment").value
  );

  console.log("Parsed values:", laborCost, consultingCharges, advancePayment);

  if (isNaN(consultingCharges) || isNaN(advancePayment)) {
    alert("Invalid numerical values in Consulting Charges or Advance Payment");
    return;
  }

  console.log("I am here updateFinance22");

  // Calculate Total Costing
  const totalCosting = laborCost + consultingCharges;
  console.log(totalCosting, "Total Costing");

  // Update total costing (ensure it's a text input if needed)
  document.getElementById("totalCosting").textContent = `${totalCosting.toFixed(
    2
  )}`;
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Finance Milestone Form Loaded");

  let FinForm = document.querySelector("#financeMilestoneForm");
  if (!FinForm) {
    console.error("Finance Milestone Form not found! Check your form ID.");
    return;
  }

  // ✅ Handle Update Form Submission
  FinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let finFormData = new FormData(FinForm);

    fetch(FinForm.action, {
      method: "POST",
      body: finFormData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Form submitted successfully!");
          alert(data.message);
          toggleFinanceEdit(); // Lock fields after update
          window.location.reload();
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  // ✅ Handle Milestone Deletion (Event Delegation)
  document.addEventListener("click", function (event) {
    let deleteIcon = event.target.closest(".delete-milestone");
    if (!deleteIcon) return;

    let milestoneRow = deleteIcon.closest("tr");
    let deleteMarker = milestoneRow
      ? milestoneRow.querySelector(".delete-marker")
      : null;

    if (!deleteMarker) {
      console.error(
        "Hidden delete marker input not found in row:",
        milestoneRow
      );
      return; // Exit function if the hidden input is missing
    }

    if (confirm("Are you sure you want to delete this milestone?")) {
      deleteMarker.value = "1"; // Mark for deletion
      milestoneRow.style.display = "none"; // Hide the row instead of removing it
    }
  });
});

// ✅ Function to Get CSRF Token
function getCSRFToken() {
  return document.querySelector("[name=csrfmiddlewaretoken]").value;
}

// for opening and closing the popup of add milestone
function openPopup() {
  document.getElementById("milestonePopup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("milestonePopup").classList.add("hidden");
}

// java script for modal
function openChatModal() {
  document.getElementById("chatModal").classList.remove("hidden");
}

// Close the message modal
function closeChatModal() {
  document.getElementById("chatModal").classList.add("hidden");
}

// Send a new message and display it in the message area
function sendNewMessage() {
  const input = document.getElementById("newMessageInput");
  const container = document.getElementById("messageArea");

  if (input.value.trim()) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message-box outgoing mb-3";
    messageDiv.innerHTML = `   
      <img src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg" alt="User Avatar" class="avatar-img">
          <div class="message-content-box">
              <p>${input.value}</p>  
              <span class="time-stamp">just now</span>  
          </div>
      `;
    container.appendChild(messageDiv);
    input.value = "";
    container.scrollTop = container.scrollHeight;
  }
}

//  New script part for adding the functionality of the updating progress and status
document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("updateStatusProgress");

  if (!form) return; // Ensure form exists before adding event listeners

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent full page reload

    // Enable status dropdown before submitting
    let statusDropdown = form.querySelector("#projectStatus");
    statusDropdown.disabled = false;

    let formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);

          // Update progress bar dynamically
          let progressBar = document.querySelector("#progressFill");
          let newProgress = form.querySelector("#newProgress").value;
          progressBar.style.width = newProgress + "%";

          // Store state to prevent back button issues
          history.replaceState(null, "", window.location.href);
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Initialize progress bar on page load
  let progressElement = document.getElementById("progressFill");
  if (progressElement) {
    let progressValue = parseInt(progressElement.dataset.progress, 10) || 0;
    progressElement.style.width = progressValue + "%";
  }
});

// Update time lines funcitonality
document.addEventListener("DOMContentLoaded", function () {
  let datesForm = document.getElementById("updateDates");

  if (!datesForm) return; // Ensure form exists before adding event listeners

  datesForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent full page reload

    let formData = new FormData(datesForm);

    fetch(datesForm.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Timeline updated successfully!");

          // Disable inputs after update
          document.getElementById("startDate").disabled = true;
          document.getElementById("endDate").disabled = true;

          // Hide update button
          document.getElementById("updateButton").classList.add("hidden");
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the timeline.");
      });
  });
});
