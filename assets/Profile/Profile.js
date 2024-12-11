// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN8UQscHAfxsKfn6tJ5yHtAj00EG3V8zI",
  authDomain: "comics-tv-8e695.firebaseapp.com",
  projectId: "comics-tv-8e695",
  storageBucket: "comics-tv-8e695.appspot.com",
  messagingSenderId: "457088220613",
  appId: "1:457088220613:web:529c86c12d13435f6adfac",
  measurementId: "G-CBWWFMVLKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// DOM Elements
const fileInput = document.getElementById("fileInput");
const profileImage = document.getElementById("profileImage");

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const storageRef = ref(storage, `profile_pictures/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    profileImage.src = url;
    alert("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file: " + error.message);
  }
});