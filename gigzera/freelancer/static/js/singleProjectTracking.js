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
<<<<<<< HEAD
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const taskList = document.querySelector(".task-list");

  // Create new task div
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.innerHTML = `
    <div class="task-row">
      <input type="checkbox" class="task-checkbox">
      <label class="task-title">New Task</label>
      <i class="fa-solid fa-pen-to-square edit-icon"></i>
      <select>
         <option>Requirement Gathering</option>
                  <option>Designing</option>
                  <option>Development</option>
                  <option>Testing</option>
                  <option>UAT</option>
                  <option>Completed</option>
      </select>
    </div>
    <div class="task-comment">
     <button onclick="openChatModal()" class="comment-button" disabled>
      Add Comment
      </button>          
    </div>
  `;

  taskList.appendChild(newTask);
  addEditFunctionality(newTask);
});

document.getElementById("deleteSelectedBtn").addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".task-checkbox");
    if (checkbox.checked) {
      task.remove();
    }
  });
});

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
document
  .querySelectorAll(".task")
  .forEach((task) => addEditFunctionality(task));
=======
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
>>>>>>> 440389d889c488fe5f45c8f11cb30a4c54262362

// Open the message modal when clicking 'Add Comment'
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
<<<<<<< HEAD
=======

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

// javascript for message box
function sendMessage() {
  const input = document.getElementById("messageInput");
  const container = document.getElementById("messagesContainer");

  if (input.value.trim()) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message sent";
    messageDiv.innerHTML = ` 
        <img
              src="https://cdn.yellowmessenger.com/cMvNTJMdqlfz1734610513305.jpeg"
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
>>>>>>> 440389d889c488fe5f45c8f11cb30a4c54262362
