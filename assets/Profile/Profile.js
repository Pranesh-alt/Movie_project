const avatar = document.getElementById("avatar");
const avatarInput = document.getElementById("avatarInput");
const nameInput = document.getElementById("nameInput");
const editModeBtn = document.getElementById("editModeBtn");

const popupModal = document.getElementById("popupModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const profileDetails = document.getElementById("profileDetails");

let isEditMode = false;

// Toggle edit mode
editModeBtn.addEventListener("click", () => {
  isEditMode = !isEditMode;
  nameInput.disabled = !isEditMode;
  editModeBtn.textContent = isEditMode ? "Save" : "Edit Mode";

  if (!isEditMode) {
    profileDetails.textContent = `Name: ${nameInput.value}`;
    popupModal.style.display = "flex";
  }
});

// Avatar change
avatar.addEventListener("click", () => {
  if (isEditMode) {
    avatarInput.click();
  }
});

avatarInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatar.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  popupModal.style.display = "none";
});