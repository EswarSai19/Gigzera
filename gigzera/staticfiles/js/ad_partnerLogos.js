function editRow(button) {
  const row = button.closest("tr");

  // Fetch logo ID from the data attribute
  const logoId = row.getAttribute("data-id");
  document.getElementById("logoId").value = logoId;

  // Fetch and display the current file name
  const logoName = row.getAttribute("data-logoName") || "None selected";
  const mediaUploadContainer = document.getElementById("editMediaUpload");
  mediaUploadContainer.innerHTML = `
        <p>File selected: <strong>${logoName}</strong></p>
        <p>Click to select a new file or drag-and-drop here.</p>
    `;

  console.log("Editing Logo ID:", logoId); // Debugging output

  // Show the edit modal
  openModaledit();
}

document.getElementById("editPartnerLogoForm").onsubmit = function (event) {
  const logoId = document.getElementById("logoId").value.trim();
  const fileInput = document.getElementById("editFileInput");

  if (!logoId) {
    alert("Logo ID is missing. Please try again.");
    event.preventDefault(); // Prevent form submission
    return;
  }

  if (!fileInput.files.length) {
    alert("Please select a file to upload.");
    event.preventDefault(); // Prevent form submission
    return;
  }

  console.log("Submitting form with Logo ID:", logoId);
};

// Modal functions
function openModal() {
  document.getElementById("createAdModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("createAdModal").classList.add("hidden");
}

function openModaledit() {
  document.getElementById("editAdModal").classList.remove("hidden");
}

function closeModaledit() {
  document.getElementById("editAdModal").classList.add("hidden");
}

// // File selection handling
// function handleFileSelect(event) {
//   uploadedFile = event.target.files[0];
//   if (uploadedFile) {
//     document.getElementById("mediaUpload").innerHTML = `
//       <p>File selected: ${uploadedFile.name}</p>
//       <p>Size: ${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
//     `;
//   }
// }

// function handleFileSelectForEdit(event) {
//   uploadedFile = event.target.files[0];
//   if (uploadedFile) {
//     document.getElementById("editMediaUpload").innerHTML = `
//       <p>File selected: ${uploadedFile.name}</p>
//       <p>Size: ${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
//     `;
//   }
// }
