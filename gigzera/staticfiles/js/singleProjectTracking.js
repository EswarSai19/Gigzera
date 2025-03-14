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

// function addEditFunctionality(task) {
//   const editIcon = task.querySelector(".edit-icon");
//   const title = task.querySelector(".task-title");
//   const commentButton = task.querySelector(".comment-button");

//   editIcon.addEventListener("click", () => {
//     if (editIcon.classList.contains("editing")) {
//       // Save and reset after editing
//       title.contentEditable = "false";
//       commentButton.disabled = true;
//       editIcon.classList.remove("editing");
//       editIcon.style.color = "#007bff"; // Reset icon color
//     } else {
//       // Enable editing
//       title.contentEditable = "true";
//       commentButton.disabled = false;
//       title.focus();
//       editIcon.classList.add("editing");
//       editIcon.style.color = "#0056b3"; // Indicate editing mode
//     }
//   });
//   // Open comment modal and set task reference
//   commentButton.addEventListener("click", () => {
//     if (!commentButton.disabled) {
//       openChatModal(task);
//     }
//   });
// }

// Initialize edit functionality for existing tasks
// document
//   .querySelectorAll(".task")
//   .forEach((task) => addEditFunctionality(task));

// Open the message modal when clicking 'Add Comment'
// function openChatModal() {
//   document.getElementById("chatModal").classList.remove("hidden");
// }

// // Close the message modal
// function closeChatModal() {
//   document.getElementById("chatModal").classList.add("hidden");
// }

// // Send a new message and display it in the message area
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

// Function to open chat modal and load existing messages
function openChatModal(taskId) {
  console.log("Taskid", taskId);
  document.getElementById("msgTaskId").value = taskId;
  document.getElementById("chatModal").classList.remove("hidden");

  // Clear previous messages
  const messageArea = document.getElementById("messageArea");
  messageArea.innerHTML = "";

  // Fetch existing messages for this task
  fetch(`/freelancer/get-comments/?taskId=${encodeURIComponent(taskId)}`)
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
          const isClientMessage = messageObj.userId.startsWith("FL");
          const senderInitials = messageObj.userId.substring(0, 2);
          addMessageToUI(
            messageObj.message,
            messageObj.time,
            isClientMessage,
            senderInitials
          );
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
    addMessageToUI(messageText, "Sending...", true, "FL");

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
function addMessageToUI(
  messageText,
  timeStamp,
  isClientMessage,
  senderInitials
) {
  const messageArea = document.getElementById("messageArea");

  const messageBox = document.createElement("div");
  // If it's a client message, make it appear on the right side
  messageBox.className = isClientMessage
    ? "message-box message sent flex items-center gap-2"
    : "message-box message received flex items-center gap-2";
  console.log(messageBox.className, "SS");
  if (isClientMessage) {
    messageBox.innerHTML = `
    <div class="message-content-box">
      <p>${messageText}</p>
      <span class="time-stamp">${timeStamp}</span>
    </div>
  `;
  } else {
    messageBox.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex justify-center items-center text-md font-bold">
      <span id="profile-initials">${senderInitials}</span>
    </div>
    <div class="message-content-box">
      <p>${messageText}</p>
      <span class="time-stamp">${timeStamp}</span>
    </div>
  `;
  }

  messageArea.appendChild(messageBox);
  messageArea.scrollTop = messageArea.scrollHeight;
}

// scroll to bottom
document.addEventListener("DOMContentLoaded", function () {
  var messagesContainer = document.getElementById("messagesContainer");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Function to close the chat modal
function closeChatModal() {
  document.getElementById("chatModal").classList.add("hidden");
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

//
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

// latest messages
function fetchLatestMessages() {
  const ongpId = new URLSearchParams(window.location.search).get("ongpId");
  if (!ongpId) return;

  fetch(`/freelancer/get-latest-messages/?ongpId=${ongpId}`)
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

        if (key.startsWith("FL")) {
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
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex justify-center items-center text-sm font-bold">
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

//
document
  .getElementById("newMessageInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents new line in the input
      document.querySelector(".send-message-btn").click(event); // Triggers the button click
    }
  });

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

// Add task
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

// Open the message modal when clicking 'Add Comment'
// function openChatModal() {
//   document.getElementById("chatModal").classList.remove("hidden");
// }

// // Close the message modal
// function closeChatModal() {
//   document.getElementById("chatModal").classList.add("hidden");
// }

// // Send a new message and display it in the message area
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
// function sendMessage() {
//   const input = document.getElementById("messageInput");
//   const container = document.getElementById("messagesContainer");

//   if (input.value.trim()) {
//     const messageDiv = document.createElement("div");
//     messageDiv.className = "message sent";
//     messageDiv.innerHTML = `
//         <img
//               src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
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

// delete seleted task
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

//
// mobile view
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
