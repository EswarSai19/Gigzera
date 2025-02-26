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
function toggleTimelineEdit() {
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  // Toggle disabled state
  const isDisabled = startDate.disabled;
  startDate.disabled = !isDisabled;
  endDate.disabled = !isDisabled;

  // Provide feedback when exiting edit mode
  if (isDisabled === false) {
    if (new Date(startDate.value) > new Date(endDate.value)) {
      console.error("Start date cannot be later than the end date.");
      startDate.disabled = true;
      endDate.disabled = true;
    } else {
      console.log(
        `Timeline updated successfully: ${startDate.value} to ${endDate.value}`
      );
    }
  }
}

// Function to update Finance details
// Toggle Finance Edit Mode
function toggleFinanceEdit() {
  const financeInputs = document.querySelectorAll(
    ".finance .edit-table input, .finance .edit-table select"
  );

  // Check current state of inputs
  const isEditing = !financeInputs[0].disabled;

  // Update total costing dynamically before exiting edit mode
  if (isEditing) {
    updateFinance();
  }

  // Toggle disabled state for inputs
  financeInputs.forEach((input) => {
    input.disabled = isEditing;
  });
}

// Update Total Cost Calculation dynamically when user enters values
function updateFinance() {
  const laborCost = parseFloat(document.getElementById("laborCost").value || 0);
  const consultingCharges = parseFloat(
    document.getElementById("consultingCharges").value || 0
  );

  // Calculate Total Costing
  const totalCosting = laborCost + consultingCharges;
  document.getElementById(
    "totalCosting"
  ).textContent = `$${totalCosting.toFixed(2)}`;
}

// Automatically update total cost when user changes values
document.getElementById("laborCost").addEventListener("input", updateFinance);
document
  .getElementById("consultingCharges")
  .addEventListener("input", updateFinance);
