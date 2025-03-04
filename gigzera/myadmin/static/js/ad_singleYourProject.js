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
// function sendMessage() {
//   const input = document.getElementById("messageInput");
//   const container = document.getElementById("messagesContainer");

//   if (input.value.trim()) {
//     const messageDiv = document.createElement("div");
//     messageDiv.className = "message sent";
//     messageDiv.innerHTML = `
//         <img
//               src="  https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
//               alt="User Avatar"
//               class="user-avatar"
//             />
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
          const isClientMessage = messageObj.userId.startsWith("AD");
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
    <img
      src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
      alt="User Avatar"
      class="avatar-img"
    />
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

// send Message
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
          location.reload();
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
    <img
      src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
      alt="User Avatar"
      class="avatar-img"
    />
  `;

  messageArea.appendChild(messageBox);
  messageArea.scrollTop = messageArea.scrollHeight;
}

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
