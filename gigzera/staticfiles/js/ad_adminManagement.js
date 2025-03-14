// const inviteUserButton = document.getElementById("invite-user");
// const modal = document.getElementById("invite-modal");
// const cancelButton = document.getElementById("cancel");
// const sendInvitationButton = document.getElementById("send-invitation");
// const userTable = document.getElementById("user-table").querySelector("tbody");

// inviteUserButton.addEventListener("click", () => {
//   modal.style.display = "flex"; // Show the modal when "Invite User" is clicked
// });

// cancelButton.addEventListener("click", () => {
//   modal.style.display = "none"; // Close the modal when "Cancel" is clicked
// });

// // sendInvitationButton.addEventListener("click", () => {
// //   const username = document.getElementById("username").value;
// //   const accountId = document.getElementById("account-id").value;
// //   const role = document.getElementById("role").value;

// //   if (username && accountId && role) {
// //     // Create a new row for the table
// //     const newRow = document.createElement("tr");

// //     // Define role color
// //     let roleColor = "";
// //     if (role === "Super Admin") {
// //       roleColor = "color: blue;";
// //     } else if (role === "Admin") {
// //       roleColor = "color: green;";
// //     }

// //     // Add user data to the row, with the role styled
// //     newRow.innerHTML = `
// //                     <td>${username}</td>
// //                     <td>${accountId}</td>
// //                     <td style="${roleColor}">${role}</td>
// //                     <td class="td-btns">
// //                         <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
// //                         <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
// //                     </td>
// //                 `;

// //     // Append the new row to the table
// //     userTable.appendChild(newRow);

// //     // Reset the input fields
// //     document.getElementById("username").value = "";
// //     document.getElementById("account-id").value = "";
// //     document.getElementById("role").value = "";

// //     // Close the modal after adding the new user
// //     modal.style.display = "none";
// //   } else {
// //     alert("Please fill out all fields.");
// //   }
// // });

// // Event delegation for Edit and Delete buttons

// //
// userTable.addEventListener("click", (event) => {
//   if (event.target.classList.contains("edit-btn")) {
//     const row = event.target.closest("tr");
//     const cells = row.querySelectorAll("td");

//     // Allow the user to edit their own information
//     const newUsername = prompt("Edit User Name", cells[0].innerText);
//     const newAccountId = prompt("Edit Email Id", cells[1].innerText);
//     const newRole = prompt("Edit Role", cells[2].innerText.trim());

//     if (newUsername && newAccountId && newRole) {
//       cells[0].innerText = newUsername;
//       cells[1].innerText = newAccountId;

//       let roleColor = "";
//       if (newRole === "Super Admin") {
//         roleColor = "color: blue;";
//       } else if (newRole === "Admin") {
//         roleColor = "color: green;";
//       }
//       cells[2].innerText = newRole;
//       cells[2].style = roleColor;
//     }
//   } else if (event.target.classList.contains("delete-btn")) {
//     // Confirm before deleting the user
//     const confirmation = confirm("Are you sure you want to delete this user?");
//     if (confirmation) {
//       const row = event.target.closest("tr");
//       row.remove(); // Delete the row if confirmed
//     }
//   }
// });

document.getElementById("invite-user").addEventListener("click", function () {
  document.getElementById("invite-modal").classList.remove("hidden");
});

document.getElementById("cancel").addEventListener("click", function () {
  document.getElementById("invite-modal").classList.add("hidden");
});
// form submission related
document
  .getElementById("send-invitation")
  .addEventListener("click", function (event) {
    const modal = document.getElementById("invite-modal");
    const form = modal.querySelector("form");

    if (!form.checkValidity()) {
      event.preventDefault(); // Prevent form submission if validation fails
      modal.classList.remove("hidden"); // Ensure modal is visible so the user can fix errors
    }
  });

// document.addEventListener("DOMContentLoaded", function () {
//   // Edit button click event
//   document.querySelectorAll(".edit-btn").forEach((button) => {
//     button.addEventListener("click", function () {
//       const adminId = this.getAttribute("data-id");
//       window.location.href = `/edit_admin/?adminId=${adminId}`;
//     });
//   });

//   // Delete button click event
//   document.querySelectorAll(".delete-btn").forEach((button) => {
//     button.addEventListener("click", function () {
//       const adminId = this.getAttribute("data-id");

//       if (confirm("Are you sure you want to delete this admin?")) {
//         window.location.href = `{% url 'ad_deleteAdmin' %}?adminId=${adminId}`;
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Select the modal and form fields
  const editModal = document.getElementById("edit-modal");
  const editName = document.getElementById("editName");
  const editEmail = document.getElementById("editEmail");
  const editRole = document.getElementById("editRole");
  const editCancel = document.getElementById("editCancel");
  const editAdminId = document.getElementById("editAdminId");

  // Function to show the modal with user data
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Get user details from the closest row or data attributes
      const userRow = this.closest("tr"); // Adjust selector if needed
      const adminId = userRow.getAttribute("data-admin-id");
      const name = userRow.getAttribute("data-name");
      const email = userRow.getAttribute("data-email");
      const role = userRow.getAttribute("data-role");

      // Populate the form fields
      editName.value = name;
      editEmail.value = email;
      editRole.value = role;
      editAdminId.value = adminId;

      // Show the modal
      editModal.classList.remove("hidden");
    });
  });

  // Close modal when clicking the cancel button
  editCancel.addEventListener("click", function () {
    editModal.classList.add("hidden");
  });

  // Close modal when clicking outside the form content
  editModal.addEventListener("click", function (event) {
    if (event.target === this) {
      this.classList.add("hidden");
    }
  });
});
