const profilePicInput = document.getElementById('profilePic');
const previewImage = document.getElementById('previewImage');
const removePicBtn = document.getElementById('removePicBtn');
const defaultImage = 'default-avatar.jpg'; // Replace with the path to your default image

// Profile picture preview
profilePicInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Remove profile picture
removePicBtn.addEventListener('click', function () {
    previewImage.src = defaultImage;
    profilePicInput.value = ''; // Reset the file input
});

// Form submission
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value;

    if (name && email) {
        alert('Profile updated successfully!');
        // Add AJAX or fetch API logic here to send data to the server
    } else {
        alert('Please fill in all required fields.');
    }
});